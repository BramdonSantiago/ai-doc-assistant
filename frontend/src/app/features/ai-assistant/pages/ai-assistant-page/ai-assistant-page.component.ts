import { Component, signal, computed, inject, DestroyRef, viewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatWindowComponent } from '../../components/chat-window/chat-window.component';
import { PromptInputComponent } from '../../components/prompt-input/prompt-input.component';
import { ContextPanelComponent } from '../../components/context-panel/context-panel.component';
import { ChatMessage } from '../../models/chat-message.model';
import { ConnectionStatus } from '../../models/connection-status.model';
import { AiService } from '../../services/ai.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { TaskType } from '../../models/task-type.model';
import { ASSISTANT_OPTIONS } from '../../components/constants/assistant-options.constant';
import { ConversationStore } from '../../store/conversation.store';

@Component({
  selector: 'app-ai-assistant-page',
  imports: [HeaderComponent, ChatWindowComponent, PromptInputComponent, ContextPanelComponent],
  templateUrl: './ai-assistant-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './ai-assistant-page.component.scss'
})
export class AiAssistantPageComponent implements OnInit {
  private readonly conversationStore = inject(ConversationStore);

  readonly messages = this.conversationStore.messages;
  readonly currentConversation = this.conversationStore.currentConversation;
  readonly recentConversations = this.conversationStore.recentConversations;

  readonly promptInput = viewChild(PromptInputComponent);

  readonly isTyping = signal(false);
  private readonly aiService = inject(AiService);

  private readonly destroyRef = inject(DestroyRef);

  readonly error = signal<string>("");

  readonly lastPrompt = signal('');

  readonly connectionStatus = signal<ConnectionStatus>('online');

  readonly responseTime = signal<number | null>(null);

  readonly assistants = ASSISTANT_OPTIONS;

  selectedTask = signal<TaskType>('documentation');


  readonly conversationId = signal(
    crypto.randomUUID()
  );

  currentAssistant = computed(() =>
    ASSISTANT_OPTIONS.find(
      assistant => assistant.id === this.selectedTask()
    )!
  );

  // messages = signal<ChatMessage[]>([]);

  ngOnInit() {
    if (!this.currentConversation()) {
      this.conversationStore.createConversation(this.selectedTask());
    }
  }


  sendMessage(text: string): void {
    if (this.isTyping()) {
      return;
    }
    this.lastPrompt.set(text);

    this.responseTime.set(null);
    const start = performance.now();

    const userMessage: ChatMessage = {

      id: crypto.randomUUID(),

      role: 'user',

      content: text,

      createdAt: new Date()

    };


    this.addMessage(userMessage);
    this.conversationStore.updateTitle(text);

    this.isTyping.set(true);
    this.error.set("");


    this.aiService.sendMessage({
      conversationId: this.conversationId(),
      task: this.selectedTask(),
      message: text
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),

        finalize(() => {
          this.isTyping.set(false);
          requestAnimationFrame(() => {
            this.promptInput()?.focus();
          });
        })
      )
      .subscribe({
        next: response => {
          this.conversationStore.connectionStatus.set("online");
          const elapsed = performance.now() - start;
          this.responseTime.set(elapsed);
          this.addMessage({
            id: crypto.randomUUID(),
            role: 'assistant',
            content: response.answer,
            createdAt: new Date()
          });
        },

        error: error => {
          this.conversationStore.connectionStatus.set("offline");
          this.error.set(`
            ## ⚠️ No pude generar una respuesta

            Puede deberse a alguna de las siguientes razones:

            - El servicio no está disponible.
            - Se perdió la conexión.

            **Inténtalo nuevamente.**
            `
          );
        }

      });

  }


  private addMessage(message: ChatMessage): void {
    this.conversationStore.addMessage(message);
  }
  

  retry() {

    const prompt = this.lastPrompt();

    if (!prompt) {
      return;
    }

    this.error.set("");

    this.sendMessage(prompt);

  }

  readonly formattedResponseTime = computed(() => {

    const time = this.responseTime();

    if (time === null) {
      return null;
    }

    return `${(time / 1000).toFixed(2)} s`;

  });

  selectTask(task: TaskType): void {
    this.selectedTask.set(task);
    this.resetConversation();
  }

  resetConversation() {
    this.conversationStore.createConversation(this.selectedTask());
    this.error.set("");
    this.lastPrompt.set("");
  }

}
