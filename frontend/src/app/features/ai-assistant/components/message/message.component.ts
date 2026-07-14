import {
  Component,
  computed,
  input,
  output,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-message',
  imports: [MarkdownModule],
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  readonly message = input.required<ChatMessage>();

  readonly regenerate = output<ChatMessage>();

  readonly copied = signal(false);

  readonly isAssistant = computed(() =>
    this.message().role === 'assistant'
  );

  readonly isUser = computed(() =>
    this.message().role === 'user'
  );


  readonly avatar = computed(() =>
    this.isUser() ? 'U' : 'AI'
  );

  async copy(): Promise<void> {

    try {

      await navigator.clipboard.writeText(
        this.message().content
      );

      this.copied.set(true);

      setTimeout(() => {

        this.copied.set(false);

      }, 2000);

    } catch (error) {

      console.error(
        'Error al copiar:',
        error
      );

    }

  }

  onRegenerate(): void {

    this.regenerate.emit(
      this.message()
    );

  }

}