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

        const conversationExists = this._conversations()
            .some(conversation => conversation.id === id);

        if (!conversationExists) {
            return;
        }

        this._currentConversationId.set(id);

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
        const currentConversationId = this._currentConversationId();

        if (!currentConversationId) {
            return;
        }

        this._conversations.update(conversations =>

            conversations.map(conversation => {

                if (conversation.id !== currentConversationId) {
                    return conversation;
                }
                if (conversation.title !== 'Nueva conversación') {
                    return conversation;
                }

                return {
                    ...conversation,
                    title,
                    updatedAt: new Date()
                };

            })

        );

    }

    updateTitleFromPrompt(prompt: string): void {

        this.updateTitle(
            this.generateTitle(prompt)
        );

    }

    private generateTitle(prompt: string): string {

        const title = prompt.trim();

        if (title.length <= 40) {
            return title;
        }

        return `${title.slice(0, 40)}...`;

    }

    deleteConversation(id: string): void {

    }
}
