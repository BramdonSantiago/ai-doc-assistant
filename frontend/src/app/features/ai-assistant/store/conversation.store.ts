import { Injectable, signal, computed, inject, DestroyRef, viewChild } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { TaskType } from '../models/task-type.model';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
    providedIn: 'root'
})

export class ConversationStore {
    private readonly _conversations = signal<Conversation[]>([]);
    private readonly _currentConversationId = signal<string | null>(null);


    readonly conversations = this._conversations.asReadonly();

    readonly currentConversation = computed(() =>
        this._conversations().find(
            conversation =>
                conversation.id === this._currentConversationId()
        ) ?? null
    );

    readonly messages = computed(() =>
        this.currentConversation()?.messages ?? []
    );


    readonly recentConversations = computed(() =>

        [...this._conversations()]
            .sort(
                (a, b) =>
                    b.updatedAt.getTime() -
                    a.updatedAt.getTime()
            )
            .slice(0, 5)

    );

    createConversation(task: TaskType): void {

    }

    selectConversation(id: string): void {

    }

    setMessages(messages: ChatMessage[]): void {

    }

    addMessage(message: ChatMessage): void {

    }

    updateTitle(title: string): void {

    }

    deleteConversation(id: string): void {
        
    }
}
