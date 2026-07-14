import { Component, input } from '@angular/core';
import { Conversation } from '../../../ai-assistant/models/conversation.model';
import { TaskType } from '../../../ai-assistant/models/task-type.model';
import { AssistantOption } from '../../../ai-assistant/models/assistant-option.model';
import { ASSISTANT_OPTIONS } from '../../../ai-assistant/components/constants/assistant-options.constant';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-item',
  imports: [MatIcon, CommonModule],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.scss'
})
export class HistoryItemComponent {
  readonly conversation = input.required<Conversation>();

  getAssistant(task: TaskType): AssistantOption {

    return ASSISTANT_OPTIONS.find(
      assistant => assistant.id === task
    )!;

  }
}
