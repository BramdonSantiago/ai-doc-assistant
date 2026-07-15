import { Component, inject, signal, computed, debounced, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { ConversationStore } from '../../../ai-assistant/store/conversation.store';
import { MatIconModule } from '@angular/material/icon';
import { HistoryItemComponent } from '../../components/history-item/history-item.component';
import { Subject } from 'rxjs';
import { ConversationNavigatorService } from '../../../../core/services/conversation-navigator.service';

@Component({
  selector: 'app-history-page',
  imports: [MatIconModule, HistoryItemComponent],
  templateUrl: './history-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent {
  private readonly conversationStore = inject(ConversationStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly sortedConversations = this.conversationStore.sortedConversations;

  readonly search = signal('');

  private readonly conversationNavigator = inject(ConversationNavigatorService);

  readonly debouncedSearch = debounced(this.search, 1000);

  updateSearch(value: string): void {
    this.search.set(value);
  }

  readonly filteredConversations = computed(() => {

    const search = this.debouncedSearch.value().trim().toLowerCase();

    if (!search) {
      return this.sortedConversations();
    }

    return this.sortedConversations()
      .filter(conversation =>
        conversation.title
          .toLowerCase()
          .includes(search)
      );

  });


  openConversation(id: string): void {
    this.conversationNavigator.open(id);
  }

}
