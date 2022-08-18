import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Email {
  _id: string,
  folder: string,
  body: string,
  subject:string,
  from:  string,
  to: string,
  date: Date,
  senderName: {
     last: string, 
     first: string },
  corpus: string,

}


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<any>('assets/messages.json')
      .toPromise()
      .then(data => {
        return data;
      });
  }
}
