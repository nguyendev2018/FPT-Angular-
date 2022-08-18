import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { throwError } from 'rxjs';
import { InforBrieftVideoInList, ResponseDataSearch } from 'src/app/models/video';
import { TubeDataApiV3Service, Query } from './../../services/tube-data-api-v3.service';

interface Paginator {
  numberPerPage: number;
  totalRecords: number;
  nextPageToken: string;
  prevPageToken: string;
  currentNumberPage: number;
  pageToken?: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  configPaginator!: Paginator;

  query!: Query;

  videos!: ResponseDataSearch;
  @Output() videoId = new EventEmitter<string>();


  constructor(private tubeDataApiV3Service: TubeDataApiV3Service) { }

  ngOnInit(): void {
    this.tubeDataApiV3Service.getQueryObs().subscribe(next => {
      this.query = next;
      if (!(this.query.formQuery.keyWordControl === '')) {
        this.tubeDataApiV3Service.search(this.query.formQuery, this.query.numberPerPage).subscribe(
          res => {
            if (!(res.error)) {
              this.videos = res;
            } else {
              console.log('bad request');
              throwError(new Error('Bad request'));
            }
          },
          err => {
            alert('API key expired. Please renew the API key.');
          }
        );
      }


    });

    this.configPaginator = {
      numberPerPage: this.tubeDataApiV3Service.getNumberPerPage(),
      totalRecords: this.videos?.pageInfo.totalResults ? this.videos?.pageInfo.totalResults : 0,
      nextPageToken: this.videos?.nextPageToken,
      prevPageToken: this.videos?.prevPageToken ? this.videos.prevPageToken : '',
      currentNumberPage: 0
    };

  }

  // sanbox paginator
  paginate(e: any): void {


    if (e.page > this.configPaginator.currentNumberPage) {
      this.configPaginator.currentNumberPage = e.page;
      this.tubeDataApiV3Service.search(this.query.formQuery, this.query.numberPerPage, this.videos.nextPageToken).subscribe(next => {
        this.videos = next;
      });
    } else if (e.page < this.configPaginator.currentNumberPage) {
      this.configPaginator.currentNumberPage = e.page;
      this.tubeDataApiV3Service.search(
        this.query.formQuery,
        this.query.numberPerPage,
        this.videos.prevPageToken ? this.videos.prevPageToken : '').subscribe(next => {
          this.videos = next;
        });
    }



  }

}
