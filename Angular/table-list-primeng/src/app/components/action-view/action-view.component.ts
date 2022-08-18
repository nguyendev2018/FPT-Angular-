import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CriteriaSort, DirectionSort } from 'src/app/models';

@Component({
  selector: 'app-action-view',
  templateUrl: './action-view.component.html',
  styleUrls: ['./action-view.component.scss']
})
export class ActionViewComponent implements OnInit {

  criterias!: CriteriaSort[];
  directions!: DirectionSort[];
  keywordSearch = '';
  selectedCriteria: CriteriaSort = { name: 'Id', code: 'id', type: 'number' };
  directionSort: DirectionSort = { name: 'Ascending', code: 'asc' };


  @Output() selectedCriteriaEmit = new EventEmitter<CriteriaSort>();
  @Output() directionSortEmit = new EventEmitter<DirectionSort>();
  @Output() keywordSearchEmit = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {



    this.criterias = [
      { name: 'Id', code: 'id', type: 'number' },
      { name: 'FirstName', code: 'firstName', type: 'string' },
      { name: 'LastName', code: 'lastName', type: 'string' },
      { name: 'Email', code: 'email', type: 'string' },
      { name: 'Gender', code: 'gender', type: 'string' },
      { name: 'Birthday', code: 'birthday', type: 'string' },
      { name: 'Salary', code: 'salary', type: 'number' },
      { name: 'Phone', code: 'phone', type: 'string' },
    ];

    this.directions = [
      { name: 'Ascending', code: 'asc' },
      { name: 'Descending', code: 'dsc' }
    ];

  }

  onSelectView(): void {
    this.selectedCriteriaEmit.emit(this.selectedCriteria);
    this.directionSortEmit.emit(this.directionSort);
  }
  onSearch(search: string): void {
    this.keywordSearchEmit.emit(search);
  }

}
