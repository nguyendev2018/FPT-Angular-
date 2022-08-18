import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Error, ResponseDataSearch, Snippet, Video } from '../models/video';
import { FormQuery } from './../models/form-query';
import { API_KEY, DEBOUNCE_TIME, NUMBER_PER_PAGE, ENDPOINT } from '../store';


export interface Query {
  formQuery: FormQuery;
  numberPerPage: number;
}



@Injectable({
  providedIn: 'root'
})
export class TubeDataApiV3Service {


  // private apikey = 'AIzaSyBBb_528ZJSI5VPy3UPgt64arkY_vHuIHM';
  // private endPoint = `https://www.googleapis.com/youtube/v3/`;
  // private dbTime = 500;
  // private numberPerPage = 10;

  private apikey = API_KEY;
  private endPoint = ENDPOINT;
  private dbTime = DEBOUNCE_TIME;
  private numberPerPage = NUMBER_PER_PAGE;

  private initValueQueryForStore: Query = {
    formQuery: {
      keyWordControl: '',
      orderControl: 'viewCount',
      dateFromControl: '',
      dateToControl: ''
    },
    numberPerPage: this.getNumberPerPage()
  };


  private queryObs$: BehaviorSubject<Query> = new BehaviorSubject(this.initValueQueryForStore);

  getQueryObs(): Observable<Query> {
    return this.queryObs$.asObservable();
  }

  setQueryObs(query: Query): void {
    this.queryObs$.next(query);
  }




  getDebouceTime(): number {
    return this.dbTime;
  }
  setDebounceTime(time: number): number {
    return this.dbTime = time;
  }
  getApiKey(): string {
    return this.apikey;
  }
  setApiKey(apiKey: string): void {
    this.apikey = apiKey;
  }
  getNumberPerPage(): number {
    return this.numberPerPage;
  }
  setNumberPerPage(numberPerPageP: number): void {
    this.numberPerPage = numberPerPageP;
    let tmpQuery!: Query;
    this.getQueryObs().subscribe(next => {
      tmpQuery = next;
    });
    this.setQueryObs({ ...tmpQuery, numberPerPage: numberPerPageP });
  }

  applyAllValue(apikey: string, debounce: number, numberPerPagge: number): void {
    this.apikey = apikey;
    this.dbTime = debounce;
    this.numberPerPage = numberPerPagge;
  }

  defaultAll(apikey: string, debounce: number, numberPerPagge: number): void {
    this.apikey = apikey;
    this.dbTime = debounce;
    this.numberPerPage = numberPerPagge;
  }

  constructor(private httpClient: HttpClient) { }

  // configApi(apiKey: string = '', endPoint: string = ''): void {
  //   this.apikey = apiKey === '' ? this.apikey : apiKey;
  //   this.endPoint = endPoint === '' ? this.endPoint : endPoint;
  // }

  search(
    dataSearch: FormQuery,
    numberPerPage: number = this.numberPerPage,
    pageToken?: string,
    apiKey: string = this.apikey,
    endpoint: string = this.endPoint): Observable<ResponseDataSearch> {



    endpoint += `search?key=${apiKey}&order=${dataSearch.orderControl}&part=snippet&type=video`;
    endpoint += dataSearch.keyWordControl === '' ? '' : `&q=${dataSearch.keyWordControl}`;
    endpoint += (dataSearch.keyWordControl === '' && isNaN(numberPerPage)) ? '' : `&maxResults=${numberPerPage}`;
    endpoint += dataSearch.dateFromControl === '' ? '' : `&publishedAfter=${dataSearch.dateFromControl}`;
    endpoint += dataSearch.dateToControl === '' ? '' : `&publishedBefore=${dataSearch.dateToControl}`;
    endpoint += pageToken ? `&pageToken=${pageToken}` : '';


    console.log(endpoint);

    return this.httpClient.get<ResponseDataSearch>(endpoint);

  }

  getVideo(id: string, apiKey: string = this.apikey, endpoint: string = this.endPoint): Observable<any> {
    endpoint += `videos?id=${id}&key=${apiKey}&part=snippet,contentDetails,statistics,status,localizations`;

    return this.httpClient.get(endpoint).pipe(pluck('items'));
  }







  // sanbox paginator with api youtube v3: solution execute many request

  /**
   * Case 1: số sản phẩm trên một page <=50
   * Case 2: số sản phẩm trên một page >50
   * viết function tính tống số link hiện tại treen một trang
   * viêt function lấy về token page của một trang cụ thể bất kì
   * @param currentNumberItemPerPage số sản phẩm trên một trang hiện tại
   * @param numberPageWantToget trang muốn chuyển đến
   * @returns =>next page token
   */
  getSpecialPage(currentNumberItemPerPage: number, numberPageWantToget: number): string {
    return '';
  }
  // end sanbox


}
