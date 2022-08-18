import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from '../components/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class CanOutUncompleteGuard implements CanDeactivate<SignupComponent> {
  canDeactivate(
    component: SignupComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {



    if (!component.signUpForm.untouched) {
      const confirmOut = window.confirm('Are you sure to cancel?');
      if (confirmOut) {
        return confirmOut;
      }
    }

    return false;
  }


}
