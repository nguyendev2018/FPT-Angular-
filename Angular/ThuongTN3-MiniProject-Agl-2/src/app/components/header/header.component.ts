import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // id = '';
  // constructor() { }


  // ngOnInit(): void {
  //   const infoUsername = JSON.parse(window.localStorage.getItem('user') ?? '{}').username;
  //   const username = infoUsername ? infoUsername : 'default_khi';
  //   this.id = username;
  // }



  isLogged = true;
  items!: MenuItem[];
  indexActiveItem = 0;

  constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit(): void {

    this.commonService.getCurrentUserObs().subscribe(next => {

      const labelPrimary = `${next.firstname ? next.firstname : next.username} ${next.lastname ? next.lastname : ''}`;

      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: ['home'],
          command: (event) => {
            if (this.router.url.split('/')[1] === event.item.routerLink[0]) {
              this.indexActiveItem = 0;
            }
          }
        },
        {
          label: next.username === '' ? 'Login' : labelPrimary,
          icon: next.username === '' ? 'pi pi-sign-in' : 'pi pi-user',
          routerLink: next.username === '' ? ['login'] : ['profile', next.username],
          command: (event) => {
            if (this.router.url.split('/')[1] === event.item.routerLink[0]) {
              this.indexActiveItem = 1;
            }
          }
        },
        {
          label: next.username === '' ? 'Register' : 'Logout',
          icon: next.username === '' ? 'pi pi-directions' : 'pi pi-sign-out',
          routerLink: [`${next.username === '' ? 'register' : 'logout'}`],
          command: (event) => {
            if (this.router.url.split('/')[1] === event.item.routerLink[0]) {
              this.indexActiveItem = 2;
            }

            const initUser: User = {
              username: '',
              password: '',
              firstname: '',
              lastname: '',
              email: ''
            };
            this.commonService.setCurrentUserObs(initUser);

          }
        },
      ];



      this.indexActiveItem = this.items.findIndex(ele => this.router.url.split('/')[1] === ele.routerLink[0]);
    });



  }
}
