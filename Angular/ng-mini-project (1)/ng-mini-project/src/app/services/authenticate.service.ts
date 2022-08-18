import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserResponse } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class AuthenticateService {

	private readonly api = 'http://localhost:3000';

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};

	currentUserSubject = new BehaviorSubject<UserResponse>(null);

	currentUser$ = this.currentUserSubject.asObservable();

	constructor(private http: HttpClient) { }

	login(formData: { username: string; password: string; }): Observable<any> {
		return this.http.post(`${this.api}/login`, formData, this.httpOptions);
	}

	register(formData: { username: string; password: string; email: string; }): Observable<any> {
		return this.http.post(`${this.api}/signup`, formData, this.httpOptions);
	}

	update(formData, username: string): Observable<any> {
		return this.http.post(`${this.api}/profile/${username}`, formData, this.httpOptions);
	}

}
