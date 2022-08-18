import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-email-box',
  templateUrl: './email-box.component.html',
  styleUrls: ['./email-box.component.scss'],
})
export class EmailBoxComponent implements OnInit {
  items!: MenuItem[];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'inbox',
        icon: 'pi pi-folder-open',
        routerLink: '/messages/inbox',
      },
      {
        label: 'finance',
        icon: 'pi pi-folder-open',
        routerLink: '/messages/finance',
      },
      {
        label: 'travel',
        icon: 'pi pi-folder-open',
        routerLink: '/messages/travel',
      },
      {
        label: 'personal',
        icon: 'pi pi-folder-open',
        routerLink: '/messages/personal',
      },
      {
        label: 'spam',
        icon: 'pi pi-folder-open',
        routerLink: '/messages/spam',
      },
      {
        label: 'drafts',
        icon: 'pi pi-folder-open',
        routerLink: '/messages/drafts',
      },
      {
        label: 'sent',
        icon: 'pi pi-folder-open',
        routerLink: '/messages/sent',
      },
    ];
  }
}
