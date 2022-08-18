import { Component, Input, OnInit } from '@angular/core';
import { CriteriaSort, DirectionSort, FormTableView, User } from 'src/app/models';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  @Input() users!: User[];
  @Input() cols!: FormTableView[];

  @Input() selectedCriteria: CriteriaSort = { name: 'Id', code: 'id', type: 'number' };
  @Input() directionSort: DirectionSort = { name: 'Ascending', code: 'asc' };

  @Input() keywordSearch = '';
  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'firstName', header: 'First name' },
      { field: 'lastName', header: 'Last name' },
      { field: 'email', header: 'Email' },
      { field: 'gender', header: 'Gender' },
      { field: 'birthday', header: 'Birthday' },
      { field: 'salary', header: 'Salary' },
      { field: 'phone', header: 'Phone' }
    ];
  }

}
