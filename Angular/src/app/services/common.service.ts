import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DateFormatPipe } from '../custom-pipe/date-format.pipe';
import { PhonePipePipe } from '../custom-pipe/phone-pipe.pipe';
import { SortPipe } from '../custom-pipe/sort.pipe';

import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { User } from '../models';



@Injectable({
  providedIn: 'root'
})
export class CommonService {

  api = 'assets/users.json';
  constructor(
    private httpClient: HttpClient,
    private phonePipe: PhonePipePipe,
    private dateFormatPipe: DateFormatPipe
  ) { }


  getAll(api = this.api): Observable<User[]> {
    return this.httpClient.get<User[]>(api).pipe(
      map((data: User[]) => {
        const tmp = data.map((ele: User) => {
          return {
            ...ele,
            phone: this.phonePipe.transform(ele.phone),
            birthday: (this.dateFormatPipe.transform(ele.birthday)) ?? ''
          };
        });
        return [...tmp];
      })
    );
  }



}
