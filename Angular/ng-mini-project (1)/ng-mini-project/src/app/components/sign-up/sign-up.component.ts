import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserResponse } from 'src/app/models/user';
import { AuthenticateService } from 'src/app/services/authenticate.service';

import { Helper } from 'src/app/helper/helper';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
	formSignUp: FormGroup;

	errorMessage: string;

	formSub: Subscription;

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticateService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.formSignUp = this.fb.group({
			username: [
				'',
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(50),
				],
			],
			email: ['', [Validators.required, Validators.email]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(6),
					Validators.maxLength(50),
				],
			],
			confirm: ['', Validators.required],
		});
	}

	ngOnDestroy() {
		this.formSub.unsubscribe();
	}

	checkPassword(): { [errCode: string]: boolean; } {
		let passwordControl = this.formSignUp.get('password');
		let confirmControl = this.formSignUp.get('confirm');
		if (passwordControl.dirty && confirmControl.dirty) {
			if (passwordControl.value != confirmControl.value) {
				return { passwordNotMatch: true };
			}
		}
		return null;
	}

	isInvalidControl(controlName: string): boolean {
		let control = this.formSignUp.get(controlName);
		return !control.valid && control.touched;
	}

	getError(controlName: string, errCode: string): boolean {
		let control = this.formSignUp.get(controlName);
		return control.errors[errCode];
	}

	onSubmit() {
		Helper.validateAllFormFields(this.formSignUp);
		if (!this.formSignUp.valid) {
			return;
		}
		const { username, password, email, confirm } = this.formSignUp.value;

		if (password != confirm) {
			alert('Password confirm is not match');
			return;
		}
		let user = { username, password, email };
		this.formSub = this.authService.register(user).subscribe(
			(response: UserResponse) => {
				this.authService.currentUserSubject.next(response);
				this.router.navigate(['/home']);
			},
			(err) => {
				alert(err.error.message);
			}
		);
	}
}
