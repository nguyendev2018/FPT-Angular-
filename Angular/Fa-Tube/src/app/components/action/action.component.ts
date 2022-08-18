import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionSort } from 'src/app/models/option-sort';
import { FormQuery } from './../../models/form-query';
import { debounceTime, map } from 'rxjs/operators';
import { TubeDataApiV3Service } from './../../services/tube-data-api-v3.service';




@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  queryForm!: FormGroup;


  option: OptionSort[] = [
    { name: 'Date', code: 'date' },
    { name: 'Rating', code: 'rating' },
    { name: 'Relevance', code: 'relevance' },
    { name: 'Title', code: 'title' },
    { name: 'Video Count', code: 'videoCount' },
    { name: 'View Count', code: 'viewCount' }
  ];


  constructor(private fb: FormBuilder, private tubeDataApiV3Service: TubeDataApiV3Service) { }

  ngOnInit(): void {
    this.queryForm = this.fb.group({
      keyWordControl: ['ádasda', [Validators.required, Validators.email, Validators.minLength(8), Validators.pattern('/[0-9]{1,3}/')]],
      orderControl: [''],
      dateFromControl: [''],
      dateToControl: [''],
    });



    this.queryForm.valueChanges.pipe(debounceTime(this.tubeDataApiV3Service.getDebouceTime()), map(data => {
      return this.reFormat(data);
    })).subscribe(data => {
      this.tubeDataApiV3Service.setQueryObs({ formQuery: data, numberPerPage: this.tubeDataApiV3Service.getNumberPerPage() });
    });
  }


  reFormat(data: FormQuery): FormQuery {

    const reFormat = { ...data } as FormQuery;
    reFormat.dateFromControl = reFormat.dateFromControl === '' ? '' : new Date(reFormat.dateFromControl).toISOString();
    reFormat.dateToControl = reFormat.dateToControl === '' ? '' : new Date(reFormat.dateToControl).toISOString();
    reFormat.orderControl = reFormat.orderControl === '' ? 'viewCount' : reFormat.orderControl;


    return reFormat;
  }
}


