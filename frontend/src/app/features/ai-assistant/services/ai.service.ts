import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
    Observable
} from 'rxjs';

import {
    ChatRequest,
    ChatResponse
} from '../models/chat.model';


@Injectable({
    providedIn: 'root'
})
export class AiService {


    private apiUrl =
        'http://localhost:3000/api/ai/chat';



    constructor(
        private http: HttpClient
    ) { }



    sendMessage(
        request: ChatRequest
    ): Observable<ChatResponse> {

        return this.http.post<ChatResponse>(
            this.apiUrl,
            request
        );

    }


}