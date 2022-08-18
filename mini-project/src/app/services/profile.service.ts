import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
 export interface User {
  username: string;
  email: string;
  password: any;
  firstName:string,
  lastName:string,
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userState: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  private  currentUserChange: BehaviorSubject<User> = new BehaviorSubject(this.userState);
  // saveUserState(data: any) {
  //   if (data) {
  //     this.userState.next(data);
  //   }
  // }
  setCurrentUserObs(data: User): void {
    this.currentUserChange.next(data);
  }
  getCurrentUserObs(): Observable<User> {
    return this.currentUserChange.asObservable();
  }

  // modifyUserState() {
  //   return this.userState.asObservable();
  // }
  private httpHeader = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }
  signup(inforSigup: User): Observable<any> {

    return this.http.post<User>(
      'http://localhost:3000/signup',inforSigup,this.httpHeader
    );
  }
  signin(inforSigin: User): Observable<any> {
    return this.http.post<User>(
      'http://localhost:3000/login',inforSigin,this.httpHeader
    );
  }
  getProfile(username: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/profile/${username}`,
      this.httpHeader
    );
  }
  updateProfile(newInfor: User): Observable<User> {
    const {  firstName,lastName, username, password } = newInfor;
         let newProfile = {};
    if (firstName) {
      newProfile = { ...newProfile, firstName: firstName };
    }
    if (lastName) {
      newProfile = { ...newProfile, lastName: lastName };
    }
    if(password){
       newProfile = { ...newProfile, password: password };
    }
    		return this.http.post<User>(
      `http://localhost:3000/profile/${username}`,newProfile,this.httpHeader
    );
}

}
