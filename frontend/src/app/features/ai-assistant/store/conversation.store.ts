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

        const conversation: Conversation = {
            id: crypto.randomUUID(),
            title: 'Nueva conversación',
            task,
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this._conversations.update(conversations => [
            ...conversations,
            conversation
        ]);

        this._currentConversationId.set(conversation.id);

    }

    selectConversation(id: string): void {

    }

    setMessages(messages: ChatMessage[]): void {

    }

    addMessage(message: ChatMessage): void {

        const currentConversationId = this._currentConversationId();

        if (!currentConversationId) {
            return;
        }

        this._conversations.update(conversations =>

            conversations.map(conversation => {

                if (conversation.id !== currentConversationId) {
                    return conversation;
                }

                return {
                    ...conversation,
                    messages: [
                        ...conversation.messages,
                        message
                    ],
                    updatedAt: new Date()
                };

            })

        );

    }

    updateTitle(title: string): void {

    }

    deleteConversation(id: string): void {

    }
}
