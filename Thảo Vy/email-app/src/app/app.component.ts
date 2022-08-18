import { MessagesService } from './core/services/messages.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TabView } from 'primeng/tabview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'email-app';
  users!: string[];
  formSelectedUser = new FormGroup({
    selectedUser: new FormControl('myself@angular.dev'),
  });
  selectedMenu!: number;
  @ViewChild('tabView') tabView!: TabView;

  constructor(
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users = [
      'myself@angular.dev',
      'devgal@angular.dev',
      'devguy@angular.dev',
    ];
  }

  handleChangeSelectedUser = () => {
    this.messageService.handleChangeSelectedUSer(
      this.formSelectedUser.get('selectedUser')?.value
    );
  };

  redirect = (event: any) => {
    this.router.navigate([
      `/${this.tabView.tabs[event.index].header.toLowerCase()}`,
    ]);
  };
}
