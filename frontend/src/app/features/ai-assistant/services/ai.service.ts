import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ChatRequest } from '../models/chat-request.model';
import { ChatResponse } from '../models/chat-response.model';

@Injectable({
    providedIn: 'root'
})
export class AiService {

    private readonly http = inject(HttpClient);

    private readonly api =
        'http://localhost:3000/api/ai/chat';

    sendMessage(
        request: ChatRequest
    ): Observable<ChatResponse> {

        return this.http.post<ChatResponse>(
            this.api,
            request
        );

    }

}