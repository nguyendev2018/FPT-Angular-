import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Email } from '../../core/services/email.service';
import { EmailService } from '../../core/services/email.service';


@Component({
  selector: 'app-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.css']
})
export class EmailPreviewComponent implements OnInit {

  emails !: Email[];

  constructor(private emailService: EmailService, private activeRouter: ActivatedRoute) {
  }

  ngOnInit() {

    this.activeRouter.paramMap.subscribe(paramMap => {

      this.emailService.getEmails()
        .then(data => this.emails = data.filter((item: Email) => item.folder === paramMap.get('path'))
        );
    });
  }


}
