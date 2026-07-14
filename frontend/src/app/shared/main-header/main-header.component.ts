import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { ConversationStore } from '../../features/ai-assistant/store/conversation.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-header',
  imports: [MatIconModule],
  templateUrl: './main-header.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  readonly conversationStore = inject(ConversationStore);

  readonly model = signal('Llama 3.1');
  readonly connectionStatus = this.conversationStore.connectionStatus;
  readonly provider = signal('Groq');

  readonly connectionLabel = computed(() => {

    switch (this.connectionStatus()) {

      case 'online':
        return 'AI Online';

      case 'offline':
        return 'AI Offline';

    }

  });
}
