import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user';

export function MustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  profileForm!: FormGroup;
  currentUser!: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {

    this.profileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      password: ['', [Validators.pattern('^[a-zA-Z0-9!@#$%&*]{6,}$')]],
      confirm: [''],
    }, {
      validator: MustMatch('password', 'confirm')
    }
    );

    this.activatedRoute.params.subscribe(params => {
      this.commonService.getCurrentUserObs().subscribe(
        next => {
          if (next.username === params.id) {
            this.commonService.getProfile(params.id).subscribe(
              nextR => {
                this.profileForm.patchValue({
                  firstname: nextR.firstname,
                  lastname: nextR.lastname
                });
                this.currentUser = nextR;
              });
          }
        }
      );

    });



  }


  updateProfile(): void {
    const { confirm, ...rest } = this.profileForm.value;
    const newProfile: User = { ...rest, username: this.currentUser.username };
    this.commonService.updateProfile(newProfile).subscribe(
      next => {
        if (next.error) {
          alert(next.error.message);
          throwError(next.error);
        } else {
          this.commonService.getProfile(this.currentUser.username).subscribe(
            nextUser => {
              console.log(nextUser, '123467890');

              this.currentUser = nextUser;
              this.profileForm.patchValue({
                firstname: nextUser.firstname,
                lastname: nextUser.lastname,
                password: '',
                confirm: ''
              });
              this.commonService.setCurrentUserObs(nextUser);
              alert('Update succesfully');
            }
          );
        }
      },
      err => {
        alert(err.error?.message);
      }
    );
  }




  logout(): void {
    const initUser: User = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: ''
    };
    this.commonService.setCurrentUserObs(initUser);
    this.router.navigate(['/home']);
  }


}
