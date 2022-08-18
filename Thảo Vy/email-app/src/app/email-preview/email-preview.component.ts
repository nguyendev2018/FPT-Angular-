import { Message } from './../core/models/message';
import { MessagesService } from './../core/services/messages.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss'],
})
export class EmailPreviewComponent implements OnInit {
  messageList: Message[] = [];
  selectedMessage!: Message;

  constructor(
    private messagesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.messagesService.selectedUser.subscribe({
      next: () => {
        this.activatedRoute.params.subscribe({
          next: (params) => {
            this.messageList = this.messagesService.getMessages(params.option);
          },
        });
      },
    });
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.messageList = this.messagesService.getMessages(params.option);
      },
    });
  }

  onMessageSelect = (event: any) => {
    this.router.navigate([event.data._id], {
      relativeTo: this.activatedRoute,
    });
  };

  onMessageUnselect = () => {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.router.navigate([`messages/${params.option}`]);
      },
    });
  };
}
