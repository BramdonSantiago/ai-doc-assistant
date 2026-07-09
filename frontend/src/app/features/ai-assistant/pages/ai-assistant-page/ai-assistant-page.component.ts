import { Component, signal, computed, inject, DestroyRef, viewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatWindowComponent } from '../../components/chat-window/chat-window.component';
import { PromptInputComponent } from '../../components/prompt-input/prompt-input.component';
import { ContextPanelComponent } from '../../components/context-panel/context-panel.component';
import { ChatMessage } from '../../models/chat-message.model';
import { ConnectionStatus } from '../../models/connection-status.model';
import { AiService } from '../../services/ai.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ai-assistant-page',
  imports: [SidebarComponent, HeaderComponent, ChatWindowComponent, PromptInputComponent, ContextPanelComponent],
  templateUrl: './ai-assistant-page.component.html',
  styleUrl: './ai-assistant-page.component.scss'
})
export class AiAssistantPageComponent {
  readonly promptInput = viewChild(PromptInputComponent);

  readonly isTyping = signal(false);
  private readonly aiService = inject(AiService);

  private readonly destroyRef = inject(DestroyRef);

  readonly error = signal<string>("");

  readonly lastPrompt = signal('');

  readonly connectionStatus = signal<ConnectionStatus>('online');

  readonly responseTime = signal<number | null>(null);


  readonly messages = signal<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `
        # 👋 Bienvenido a AI Documentation Assistant

        Soy tu asistente especializado en **documentación técnica para desarrolladores**.

        ## ¿Qué puedo hacer?

        - 📄 Generar documentación de código.
        - 🌐 Documentar endpoints de APIs REST.
        - 📚 Crear archivos **README.md**.
        - 🏗️ Explicar la arquitectura de una aplicación.
        - 🗄️ Describir modelos de datos y bases de datos.

        ## Prueba con alguno de estos ejemplos

        \`\`\`text
        Documenta este componente Angular.
        \`\`\`

        \`\`\`text
        Genera la documentación para este endpoint REST.
        \`\`\`

        \`\`\`text
        Explícame cómo funciona este servicio de Angular.
        \`\`\`

        \`\`\`text
        Crea un README para este proyecto.
        \`\`\`

        \`\`\`text
        Genera documentación técnica para el siguiente código.
        \`\`\`

        > 💡 También puedes pegar un fragmento de código directamente y generar documentación en formato Markdown.

      `,
      createdAt: new Date()
    }
  ]);

  readonly conversationId = signal(
    crypto.randomUUID()
  );

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


    this.isTyping.set(true);
    this.error.set("");


    this.aiService.sendMessage({
      conversationId: this.conversationId(),
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
          this.connectionStatus.set('online');
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
          this.connectionStatus.set('offline');
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

    this.messages.update(messages => [
      ...messages,
      message
    ]);

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



}
