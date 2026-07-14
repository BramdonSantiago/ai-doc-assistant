import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { ConversationStore } from '../../../ai-assistant/store/conversation.store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HistoryItemComponent } from '../../components/history-item/history-item.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-history-page',
  imports: [CommonModule, MatIconModule, HistoryItemComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent {
  private readonly conversationStore = inject(ConversationStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly sortedConversations = this.conversationStore.sortedConversations;

  readonly search = signal('');
  private readonly searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.search.set(value);
      });
  }

  updateSearch(value: string): void {

    this.searchSubject.next(value);

  }

  readonly filteredConversations = computed(() => {

    const search = this.search().trim().toLowerCase();

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

}
