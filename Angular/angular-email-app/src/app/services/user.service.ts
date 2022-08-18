import { Injectable } from '@angular/core';

import { StaticMessageService } from 'src/app/services/static-message.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private msgService: StaticMessageService) {}

    users: string[] = [];

    curUser: string = '';

    getUsers(): string[] {
        let usersTmp = this.msgService.getAllMsg().map((msg) => msg.to);
        this.users = [...new Set(usersTmp)];
        return this.users;
    }

    getCurrentUser() {
        return this.curUser;
    }

    setCurrentUser(value: string) {
        if (value.length) {
            this.curUser = value;
        }
    }
}
