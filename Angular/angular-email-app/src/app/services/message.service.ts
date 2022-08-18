import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MessageModel } from '../models/message.model';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    configUrl = 'assets/messages.json';

    constructor(private http: HttpClient) {}

    getMessages(): Observable<MessageModel> {
        return this.http.get<MessageModel>(this.configUrl);
    }

    // getFolders(): Observable<string[]> {
    // 	return this.http.get()
    // }
}
