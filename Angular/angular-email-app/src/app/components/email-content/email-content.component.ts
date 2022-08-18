import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MessageModel } from './../../models/message.model';
import { StaticMessageService } from './../../services/static-message.service';

@Component({
    selector: 'app-email-content',
    templateUrl: './email-content.component.html',
    styleUrls: ['./email-content.component.scss'],
})
export class EmailContentComponent implements OnInit {
    message: MessageModel;

    constructor(
        private route: ActivatedRoute,
        private staticMsgService: StaticMessageService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.message = this.staticMsgService.getMsgById(params.get('id'));
        });
    }
}
