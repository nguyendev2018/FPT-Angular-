import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { SignupComponent } from '../components/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class CanOutGuard implements CanDeactivate<LoginComponent> {
  canDeactivate(
    component: LoginComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {



    if (!component.logInForm.untouched) {
      const confirmOut = window.confirm('Are you sure to cancel?');
      if (confirmOut) {
        return confirmOut;
      }
    }

    return false;
  }


}
