import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  subscription!: Subscription;
  msgs2: any;
  searchForm!: FormGroup;
  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9!@#$%&*]{6,}$')]]
    });
  }

  get username() {
    return this.searchForm.controls.username;
  }

  get password() {
    return this.searchForm.controls.password;
  }

  login(): void {
    this.subscription = this.profileService.signin(this.searchForm.value).subscribe(data => {
      this.authService.login();
      this.profileService.setCurrentUserObs(data)
      this.router.navigate(['home']);
    },
      err => {
        this.msgs2 = [
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
