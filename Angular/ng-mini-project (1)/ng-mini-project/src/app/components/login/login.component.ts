import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Helper } from 'src/app/helper/helper';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	formLogin: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticateService,
		private router: Router
	) { }


	ngOnInit(): void {
		let user = JSON.parse(localStorage.getItem('user'));
		this.formLogin = this.fb.group({
			username: [user?.username, Validators.required],
			password: [user?.password, Validators.required],
			remember: [user != null],
		});
	}

	isInvalidControl(controlName: string): boolean {
		let control = this.formLogin.get(controlName);
		return !control.valid && control.touched;
	}

	onSubmit() {
		Helper.validateAllFormFields(this.formLogin);
		if (!this.formLogin.valid) {
			return;
		}
		let { username, password, remember } = this.formLogin.value;
		let user = { username, password };
		if (remember) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.clear();
		}
		this.authService.login(user).subscribe(
			(res) => {
				this.authService.currentUserSubject.next(res);
				alert('Login Successfully');
				this.router.navigate(['/home']);
			},
			(err) => {
				console.clear();
				alert(err.error.message);
			}
		);
	}
}
