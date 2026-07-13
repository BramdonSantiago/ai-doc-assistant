import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ConversationStore } from '../../store/conversation.store';
import { CommonModule } from '@angular/common';
import { TaskType } from '../../models/task-type.model';
import { AssistantOption } from '../../models/assistant-option.model';
import { ASSISTANT_OPTIONS } from '../constants/assistant-options.constant';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly conversationStore = inject(ConversationStore);

  readonly recentConversations = this.conversationStore.recentConversations;
  readonly currentConversation = this.conversationStore.currentConversation;

  getAssistant(task: TaskType): AssistantOption {

    return ASSISTANT_OPTIONS.find(
      assistant => assistant.id === task
    )!;

  }

  selectConversation(id: string): void {
    this.conversationStore.selectConversation(id);
  }

}
