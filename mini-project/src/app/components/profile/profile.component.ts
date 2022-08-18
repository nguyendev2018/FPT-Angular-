import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { MustMatch } from 'src/app/MustMatch/must-match';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})

export class ProfileComponent implements OnInit {
  searchForm!: FormGroup;
  username!: string
  msgs3: any;
  msgs4: any;

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    });
    this.profileService.getCurrentUserObs().subscribe(value => {
      this.username = value.username
      this.profileService.getProfile(value.username).subscribe(data => {
        this.initializeForm(data)
      })
    });
  }

  initializeForm(data: any) {
    this.searchForm = this.fb.group({
      firstName: [data.firstName, [Validators.required]],
      lastName: [data.lastName, [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%&*]{6,}$'), Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get firstName() {
    return this.searchForm.controls["firstName"];
  }

  get lastName() {
    return this.searchForm.controls["lastName"];
  }

  get password() {
    return this.searchForm.controls["password"];
  }

  get confirmPassword() {
    return this.searchForm.controls["confirmPassword"];
  }

  logout(): void {
    this.router.navigate(['home']);
  }

  updateProfile(): void {
    const { confirmPassword, ...rest } = this.searchForm.value;
    const newProfile: User = { ...rest, username: this.username };
    this.profileService.updateProfile(newProfile).subscribe(
      data => {
        this.profileService.getProfile(this.username).subscribe(
          data => {
            this.searchForm.patchValue({
              firstName: data.firstName,
              lastName: data.lastName,
              password: '',
              confirmPassword: ''
            });
            this.profileService.setCurrentUserObs(data);
          }
        );
        this.msgs3 = [
          { severity: 'success', summary: 'success', detail: 'Đã lưu được dữ liệu' }
        ];
      },
      err => {
        this.msgs4 = [
          { severity: 'error', summary: 'error', detail: 'Sai thông tin ở form nào đấy ' }
        ];
      }
    );
  }

  logOut(): void {
    const initUser: User = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    this.profileService.setCurrentUserObs(initUser);
  }
}
