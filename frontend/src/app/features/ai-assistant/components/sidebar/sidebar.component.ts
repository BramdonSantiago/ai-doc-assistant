import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ConversationStore } from '../../store/conversation.store';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly conversationStore = inject(ConversationStore);

  readonly recentConversations = this.conversationStore.recentConversations;
}
