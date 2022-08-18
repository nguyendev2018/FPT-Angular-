import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhonePipePipe } from './custom-pipe/phone-pipe.pipe';
import { DateFormatPipe } from './custom-pipe/date-format.pipe';
import { SortPipe } from './custom-pipe/sort.pipe';
import { CommonService } from './services/common.service';
import { CriteriaSort, DirectionSort, FormTableView, User } from './models';
import { FilterPipe } from './custom-pipe/filter.pipe';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'table-list-primeng';


  users!: User[];
  cols!: FormTableView[];

  selectedCriteria: CriteriaSort = { name: 'Id', code: 'id', type: 'number' };
  directionSort: DirectionSort = { name: 'Ascending', code: 'asc' };
  keywordSearch = '';


  constructor(
    private sortPipe: SortPipe,
    private commonService: CommonService,
    private filterPipe: FilterPipe
  ) { }

  ngOnInit(): void {

    this.commonService.getAll().subscribe((data: User[]) => {
      this.users = [...this.sortPipe.transform(data, this.directionSort.code, this.selectedCriteria.code, this.selectedCriteria.type)];
    });


  }



  getDirectionSort(directionSortData: DirectionSort): void {
    this.directionSort = { ...directionSortData };
    this.users = [...this.sortPipe.transform(this.users, this.directionSort.code, this.selectedCriteria.code, this.selectedCriteria.type)];
  }
  getSelectedCriteria(selectedCriteriaData: CriteriaSort): void {
    this.selectedCriteria = { ...selectedCriteriaData };
    this.users = [...this.sortPipe.transform(this.users, this.directionSort.code, this.selectedCriteria.code, this.selectedCriteria.type)];


    // const testSearch = this.filterPipe.transform(this.users, 'Female');
    // console.table(testSearch);
  }

  onSearch(dataSearch: string): void {
    this.keywordSearch = dataSearch;
  }


}
