import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YoutubeV3Service } from './../../services/youtube-v3.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  option: string[] = ['date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount'];
  video!: any; 
  searchForm!: FormGroup;
  videoResults!: any[];
  constructor(private fb: FormBuilder, private youtubeV3Service: YoutubeV3Service) { }
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      controlSearch: ['',Validators.required],
      controlDateFrom: [''],
      controlDateTo: [''],
      optionSort: [''],
    });
  }
  // chain operator

  onSubmit(): void {

    const keyWord = this.searchForm.get('controlSearch')?.value;
    let dataSort = this.searchForm.get('optionSort')?.value;
    dataSort = dataSort === '' ? 'viewCount' : dataSort;

    this.youtubeV3Service.search(keyWord, dataSort).subscribe(
      data => {
        console.log(data.items, 'kết quả');
        this.videoResults = data.items;
      },
      err => {
        console.log(err, 'lỗi rồi');
      },
    );
    return;
  }
  videoDetail(videoId: string): void {
    this.youtubeV3Service.getVideo(videoId).subscribe(
      data => {
        console.log(data);
        if (!(data.error === false)) {
          this.video = data.items[0];
          console.log(this.video);
        } else {
          alert('try again');
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
