import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(
    private cms: CommonService,
    private fb: FormBuilder,
    private router: Router) { }

  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%&*]{6,}$')]]
    });

  }

  signup(): void {
    console.log(this.form.value);
    this.cms.signup(this.form.value).subscribe(
      next => {
        console.log(next);
        if (next.statusCode === 400) {
          alert('sai roi');

        } else {
          // console.log(next, 'dung roi');
          this.router.navigate(['/login']);
        }
      },
      err => {
        console.log('err');
      }
    );

  }

}
