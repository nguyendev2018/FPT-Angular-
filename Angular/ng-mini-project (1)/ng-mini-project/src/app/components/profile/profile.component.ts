import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserResponse } from 'src/app/models/user';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

	curUserSub: Subscription;

	currentUser: UserResponse;

	formProfile: FormGroup;

	name: string;

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticateService,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.curUserSub = this.authService.currentUser$.subscribe((data) => {
			this.currentUser = data;
			let { firstName, lastName, username } = this.currentUser;
			this.name = (firstName && lastName) ? `${firstName} ${lastName}` : username;
			this.formProfile = this.fb.group({
				firstName: [firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
				lastName: [lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
				password: ['', [Validators.minLength(6), Validators.maxLength(50)]],
				confirm: [''],
			});
		});

	}

	ngOnDestroy() {
		this.curUserSub.unsubscribe();
	}

	isInvalidControl(controlName: string): boolean {
		let control = this.formProfile.get(controlName);
		return !control.valid && control.touched;
	}

	getError(controlName: string, errCode: string): boolean {
		let control = this.formProfile.get(controlName);
		return control.errors[errCode];
	}

	onSubmit() {
		if (!this.formProfile.touched) {
			return;
		}
		if (!this.formProfile.valid) {
			alert('Form data is invalid');
			return;
		}
		let { firstName, lastName, password, confirm } = this.formProfile.value;
		if (password != confirm) {
			alert('Password is not match!');
			return;
		}
		let formData = { firstName, lastName };
		if (password) {
			formData['password'] = password;
		}
		this.authService.update(formData, this.currentUser.username).subscribe((res) => {
			this.authService.currentUserSubject.next(res);
			alert('Update Successfully');
			this.router.navigate(['/profile', this.currentUser.username]);
		}, (err) => {
			console.clear();
			alert(err.error.message);
		});
	}

	onSignout() {
		this.router.navigate(['/sign-out']);
	}
};
