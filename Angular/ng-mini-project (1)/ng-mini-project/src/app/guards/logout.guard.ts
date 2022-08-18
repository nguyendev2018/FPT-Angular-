import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
	providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

	constructor(private authService: AuthenticateService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let currentUser;
		this.authService.currentUser$.subscribe((data) => {
			currentUser = data;
		});
		if (!currentUser) {
			alert('Please login');
		}
		return currentUser ? true : false;
	}

}
