import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface User {
  username: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private httpHeader = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {

  }

  valueForm = {
    orderControl: 'value',
    dateFrom: 'value'
  };




  signup(inforSigup: User): Observable<any> {

    return this.http.post<User>('http://localhost:3000/signup', inforSigup, this.httpHeader);
  }


  signin(inforSigup: User): Observable<any> {
    return this.http.post<User>('http://localhost:3000/login', inforSigup, this.httpHeader);
  }

  getProfile(username: string): Observable<any> {
    return this.http.get(`http://localhost:3000/profile/${username}`, this.httpHeader);
  }



  updateProfile(username: string, passwordP?: string, lastNameP?: string, fisrtNameP?: string): Observable<any> {
    const newProfile = {
      fisrtName: fisrtNameP,
      lastName: lastNameP,
      password: passwordP
    };
    // if (lastNameP) {
    //   newProfile = { ...newProfile, firstName: fisrtNameP };
    // }
    // if (fisrtNameP) {
    //   newProfile = { ...newProfile, lastName: lastNameP };
    // }
    // if (passwordP) {
    //   newProfile = { ...newProfile, password: passwordP };
    // }

    return this.http.post(`http://localhost:3000/profile/${username}`, newProfile, this.httpHeader);

  }




}
