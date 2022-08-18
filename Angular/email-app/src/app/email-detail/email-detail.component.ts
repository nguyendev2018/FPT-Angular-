import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmailService } from '../../core/services/email.service';
import { Email } from '../../core/services/email.service';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css']
})
export class EmailDetailComponent implements OnInit {

  email !: Email;
  constructor(private emailService: EmailService, private activeRouter: ActivatedRoute) {

  }

  ngOnInit() {

    this.activeRouter.paramMap.subscribe(paramMap => {
      // console.log(paramMap.get('id'));
    });

  }

}
