import { Component } from '@angular/core';
import { fromEvent, throwError } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FormQuery } from './models/form-query';
import { InforBrieftVideoInList, ResponseDataSearch, Video } from './models/video';
import { TubeDataApiV3Service } from './services/tube-data-api-v3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fa-Tube';
  constructor() { }





}


