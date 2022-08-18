import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { StaticMessageService } from 'src/app/services/static-message.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    navItems: MenuItem[];

    itemsRight: any[];

    constructor(
        private staticMsgService: StaticMessageService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.navItems = [
            { label: 'Message', routerLink: ['/message'] },
            { label: 'Contact', routerLink: ['/contact'] },
            {
                label: 'Preferences',
                routerLink: ['/preferences'],
            },
        ];
        this.itemsRight = this.userService.getUsers();
        if (this.itemsRight.length) {
            this.userService.setCurrentUser(this.itemsRight[0]);
        }
    }
}
