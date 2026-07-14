import { Component, inject } from '@angular/core';
import { ConversationStore } from '../../../ai-assistant/store/conversation.store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TaskType } from '../../../ai-assistant/models/task-type.model';
import { AssistantOption } from '../../../ai-assistant/models/assistant-option.model';
import { ASSISTANT_OPTIONS } from '../../../ai-assistant/components/constants/assistant-options.constant';
import { HistoryItemComponent } from '../../components/history-item/history-item.component';

@Component({
  selector: 'app-history-page',
  imports: [CommonModule, MatIconModule, HistoryItemComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent {
  private readonly conversationStore = inject(ConversationStore);

  readonly conversations = this.conversationStore.sortedConversations;
}
