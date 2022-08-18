import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserResponse } from 'src/app/models/user';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

	subscription: Subscription;

	items: MenuItem[];

	currentUser: UserResponse;

	constructor(private authService: AuthenticateService) { }

	ngOnInit(): void {
		this.subscription = this.authService.currentUser$.subscribe((data: UserResponse) => {
			let firstName = '', lastName = '', username = '';
			this.currentUser = data;
			if (this.currentUser) {
				firstName = this.currentUser.firstName;
				lastName = this.currentUser.lastName;
				username = this.currentUser.username;
			}
			this.items = [
				{
					label: 'Home',
					icon: 'pi pi-home',
					routerLink: 'home'
				},
				{
					label: this.currentUser ? (firstName && lastName ? `${firstName} ${lastName}` : username) : 'Login',
					icon: this.currentUser ? 'pi pi-user' : 'pi pi-sign-in',
					routerLink: this.currentUser ? `profile/${username}` : 'login',
				},
				{
					label: this.currentUser ? 'Logout' : 'Register',
					icon: this.currentUser ? 'pi pi-sign-out' : 'pi pi-user-plus',
					routerLink: this.currentUser ? 'sign-out' : 'sign-up'
				}
			];
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
