import { Injectable, inject } from '@angular/core';
import { ConversationStore } from '../../features/ai-assistant/store/conversation.store';
import { Router } from '@angular/router';
import { TaskType } from '../../features/ai-assistant/models/task-type.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationNavigatorService {
  private readonly router = inject(Router);

  private readonly conversationStore = inject(ConversationStore);

  async open(id: string): Promise<boolean> {

    const exists = this.conversationStore
      .conversations()
      .some(c => c.id === id);

    if (!exists) {
      return false;
    }

    if (this.conversationStore.currentConversation()?.id !== id) {
      this.conversationStore.selectConversation(id);
    }

    await this.router.navigate(['/chat']);

    return true;
  }

  async create(task: TaskType): Promise<void> {

    this.conversationStore.createConversation(task);

    await this.router.navigate(['/chat']);

  }

  async goToCurrent(): Promise<void> {

    if (!this.conversationStore.currentConversation()) {
      return;
    }

    await this.router.navigate(['/chat']);

  }

  async openOrCreate(task: TaskType): Promise<void> {

    if (this.conversationStore.currentConversation()) {

      await this.goToCurrent();

      return;

    }

    await this.create(task);

  }

}
