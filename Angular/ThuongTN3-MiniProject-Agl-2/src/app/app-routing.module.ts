import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { WildcardComponent } from './components/wildcard/wildcard.component';
import { AuthGuard } from './guards/auth.guard';
import { CanOutProfileGuard } from './guards/can-out-profile.guard';
import { CanOutUncompleteGuard } from './guards/can-out-uncomplete.guard';
import { CanOutGuard } from './guards/can-out.guard';
// import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanOutProfileGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'

  },
  {
    path: '**',
    component: WildcardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
