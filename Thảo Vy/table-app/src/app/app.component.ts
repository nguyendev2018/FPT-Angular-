import { Component, OnInit } from '@angular/core';
import { User } from './core/models/user';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userList!: User[];
  fields!: any[];
  selectedField: string = 'id';
  selectedFieldName: string = 'Id';
  sortOption!: any[];
  selectedSort: string = 'Ascending';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fields = [
      {
        name: 'Id',
        value: 'id',
      },
      {
        name: 'First Name',
        value: 'firstName',
      },
      {
        name: 'Last Name',
        value: 'lastName',
      },
      {
        name: 'Email',
        value: 'email',
      },
      {
        name: 'Gender',
        value: 'gender',
      },
      {
        name: 'Birthday',
        value: 'birthday',
      },
      {
        name: 'Salary',
        value: 'salary',
      },
      {
        name: 'Phone',
        value: 'phone',
      },
    ];
    this.sortOption = ['Ascending', 'Descending'];
    this.userService.userList.subscribe({
      next: (result) => {
        this.userList = result;
        console.log(result);
      },
    });
  }

  onChangeField(field: any): void {
    this.selectedField = field.value.value;
    this.selectedFieldName = field.value.name;
  }

  onChangeSort(option: any): void {
    this.selectedSort = option.value;
  }
}
