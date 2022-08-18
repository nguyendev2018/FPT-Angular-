import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  logInForm!: FormGroup;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.logInForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%&*]{6,}$')]]
    });

  }


  login(): void {
    if (!this.logInForm.valid) {
      alert('Invalid some data field, make sure that field correct');
    } else {
      this.commonService.signin(this.logInForm.value).subscribe(
        next => {
          if (next.error) {
            throwError(next.error);
            alert(next.error.message);
          }
          else {

            this.commonService.setCurrentUserObs(next);
            this.router.navigate(['/profile', next.username]);
          }
        },
        err => {
          alert(err.error?.message);
        }
      );
    }

  }
}
