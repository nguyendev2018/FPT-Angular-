import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ProfileService } from '../../services/profile.service';
import { MustMatch } from './../../MustMatch/must-match';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  subscription!: Subscription;
  msgs1: any;
  searchForm!: FormGroup;

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%&*]{6,}$'), Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get username() {
    return this.searchForm.controls.username;
  }

  get email() {
    return this.searchForm.controls.email;
  }

  get password() {
    return this.searchForm.controls.password;
  }

  get confirmPassword() {
    return this.searchForm.controls.confirmPassword;
  }

  signUp(): void {
    const { confirmPassword, ...rest } = this.searchForm.value;
    this.profileService.signup(rest).subscribe(
      data => {
        console.log(data);
        console.log(rest);
        this.router.navigate(['/login']);
      },
      err => {
        this.msgs1 = [
          { severity: 'error', summary: 'Error', detail: 'Sai thông tin ở form nào đấy' }
        ];
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
