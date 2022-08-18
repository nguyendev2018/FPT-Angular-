import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
	constructor(private authService: AuthenticateService) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		let username = route.paramMap.get('username');
		let currentUser;
		this.authService.currentUser$.subscribe((data) => {
			currentUser = data;
		});
		return currentUser && currentUser.username == username;
	}
}
