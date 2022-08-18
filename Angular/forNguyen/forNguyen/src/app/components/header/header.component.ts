import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  id = '';
  constructor() { }

  // uer = {
  //   "username": "admin",
  //   "email": "a@b.c",
  //   "firstName": "",
  //   "lastName": ""
  // }

  ngOnInit(): void {
    const infoUsername = JSON.parse(window.localStorage.getItem('user') ?? '{}').username;
    const username = infoUsername ? infoUsername : 'default_khi';
    this.id = username;
  }

}
