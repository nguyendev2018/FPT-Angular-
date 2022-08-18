import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { StaticMessageService } from 'src/app/services/static-message.service';

@Component({
    selector: 'app-email-box',
    templateUrl: './email-box.component.html',
    styleUrls: ['./email-box.component.scss'],
})
export class EmailBoxComponent implements OnInit {
    folders: MenuItem[];

    constructor(private staticMessage: StaticMessageService) {}

    toCapitalCase(name: string) {
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }

    ngOnInit(): void {
        this.folders = this.staticMessage.getFolders().map((folder) => {
            return {
                label: this.toCapitalCase(folder),
                icon: 'pi pi-folder',
                routerLink: [
                    '/message',
                    {
                        outlets: {
                            primary: [folder],
                            content: null,
                        },
                    },
                ],
            };
        });
    }
}
