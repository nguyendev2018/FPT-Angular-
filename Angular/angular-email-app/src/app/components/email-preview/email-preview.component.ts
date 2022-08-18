import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageModel } from 'src/app/models/message.model';
import { StaticMessageService } from 'src/app/services/static-message.service';

@Component({
    selector: 'app-email-preview',
    templateUrl: './email-preview.component.html',
    styleUrls: ['./email-preview.component.scss'],
})
export class EmailPreviewComponent implements OnInit {
    folder: string;

    messages: MessageModel[];

    message: MessageModel;

    constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private staticMsgService: StaticMessageService
    ) {}

    ngOnInit(): void {
        this.activeRoute.paramMap.subscribe((params) => {
            this.folder = params.get('folder');
            this.messages = this.staticMsgService.getListMsg(this.folder);
            this.router.navigate([{ outlets: { content: null } }]);
        });
    }
}
