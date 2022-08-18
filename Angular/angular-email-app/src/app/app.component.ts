import { Component } from '@angular/core';
import { MessageModel } from './models/message.model';
import { MessageService } from './services/message.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ngEmailApp';

    constructor(private messageService: MessageService) {}

    onClick() {
        this.messageService.getMessages().subscribe((data: MessageModel) => {
            console.log(data);
        });
    }
}
