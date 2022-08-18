import { Router } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import {User} from './../../services/profile.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  id = '';


  constructor(private profile: ProfileService,private router: Router) { }
  ngOnInit(): void {
    this.profile.getCurrentUserObs().subscribe(value => {
      this.username = value.username
    })
  }
  logout(): void {
    const initUser: User = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    this.profile.setCurrentUserObs(initUser);
    this.router.navigate(['home']);
  }
}
