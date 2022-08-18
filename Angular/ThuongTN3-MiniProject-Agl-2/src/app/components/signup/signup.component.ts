import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

import { MustMatch } from '../profile/profile.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {




  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router) { }

  signUpForm!: FormGroup;
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%&*]{6,}$')]],
      confirm: ['']
    }, {
      validator: MustMatch('password', 'confirm')
    });

  }

  signup(): void {
    const { confirm, ...rest } = this.signUpForm.value;
    if (!(this.signUpForm.valid)) {
      alert('Invalid some data field, make sure that field correct');
    } else {
      this.commonService.signup(rest).subscribe(
        next => {
          if (next.error) {
            alert(next.error.message);
            throwError(next.error);
          } else {
            this.router.navigate(['/login']);
          }
        },
        err => {
          alert(err.error?.messages);
        }
      );
    }


  }

}
