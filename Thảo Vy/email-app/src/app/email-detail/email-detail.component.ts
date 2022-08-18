import { Message } from './../core/models/message';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../core/services/messages.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.scss'],
})
export class EmailDetailComponent implements OnInit {
  message!: Message | undefined;

  constructor(
    private messagesService: MessagesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.message = this.messagesService.getDetailMessage(params.id);
      },
    });
  }
}
