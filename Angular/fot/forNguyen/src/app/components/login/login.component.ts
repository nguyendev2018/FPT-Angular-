import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formLogin!: FormGroup;
  constructor(
    private cms: CommonService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%&*]{6,}$')]]
    });

  }


  login(): void {
    console.log(this.formLogin.value);
    this.cms.signin(this.formLogin.value).subscribe(next => {
      console.log(next);
      if (next.statusCode) {
        alert('sai cái gì đó rôid');
      } else {
        this.router.navigate(['home']);
      }

    },
      err => {
        alert('sai thong tin');
      }
    );
  }
}
