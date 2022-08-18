import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private httpHeader = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };
  private endPoint = `http://localhost:3000`;

  private initUser: User = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: ''
  };

  private currentUser$: BehaviorSubject<User> = new BehaviorSubject(this.initUser);


  constructor(private http: HttpClient) {
    // const userLogged = localStorage.getItem('current-user');
    // console.log(userLogged, 'asdasd');
    // if (userLogged) {
    //   const currentUser = JSON.parse(userLogged ?? this.initUser);
    //   this.setCurrentUserObs(currentUser);
    // }
  }


  getCurrentUserObs(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  setCurrentUserObs(query: User): void {
    this.currentUser$.next(query);
  }



  signup(inforSigup: User, path: string = 'signup', endpoint: string = this.endPoint): Observable<User> {

    return this.http.post<User>(`${endpoint}/${path}`, inforSigup, this.httpHeader);
  }


  signin(inforSigup: User, path: string = 'login', endpoint: string = this.endPoint): Observable<User> {

    return this.http.post<User>(`${endpoint}/${path}`, inforSigup, this.httpHeader);
  }

  getProfile(username: string, path: string = 'profile', endpoint: string = this.endPoint): Observable<User> {

    return this.http.get<User>(`${endpoint}/${path}/${username}`, this.httpHeader);
  }



  updateProfile(newInfor: User, path: string = 'profile', endpoint: string = this.endPoint): Observable<User> {
    const { firstname, lastname, username, password, email } = newInfor;
    const firstName = firstname;
    const lastName = lastname;
    const rPass = password;
    let newProfile = {};
    if (firstname) {
      newProfile = { ...newProfile, firstname: firstName };
    }
    if (lastname) {
      newProfile = { ...newProfile, lastname: lastName };
    }
    if (username) {
      newProfile = { ...newProfile, password: rPass };
    }


    return this.http.post<User>(`${endpoint}/${path}/${newInfor.username}`, newProfile, this.httpHeader);

  }




}
