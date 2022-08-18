import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static logout() {
    throw new Error('Method not implemented.');
  }
  static login() {
    throw new Error('Method not implemented.');
  }
  public isAuthorized = false;
  constructor() { }
  login(){
    this.isAuthorized = true;
  }
  logout(){
    this.isAuthorized = false;
  }
}
