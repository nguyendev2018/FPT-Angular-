import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class YoutubeV3Service {
  apikey = 'AIzaSyAEBk1Savyy_9d3enU12MgqlcLJuZNB188';
  endPoint = `https://www.googleapis.com/youtube/v3/`;
  constructor(private httpClient: HttpClient) { }
  search(keyWord: string, optionSelected: string, apiKey: string = this.apikey, endpoint: string = this.endPoint): Observable<any> {
    endpoint += `search?key=${apiKey}&order=${optionSelected}&part=snippet&type=video&q=${keyWord}&maxResults=10`;
    console.log(endpoint);
    return this.httpClient.get(endpoint);
    
  }
  getVideo(id: string, apiKey: string = this.apikey, endpoint: string = this.endPoint): Observable<any> {
    endpoint += `videos?id=${id}&key=${apiKey}&part=snippet,contentDetails,statistics,status,localizations`;
    return this.httpClient.get(endpoint);
  }
}
