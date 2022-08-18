import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileComponent } from '../components/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class CanOutProfileGuard implements CanDeactivate<ProfileComponent> {
  canDeactivate(
    component: ProfileComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {



    if (!component.profileForm.untouched) {
      const confirmOut = window.confirm('Are you sure to cancel?');
      if (confirmOut) {
        return confirmOut;
      }
    }

    return false;
  }


}
