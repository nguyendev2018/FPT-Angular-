
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-email-box',
  templateUrl: './email-box.component.html',
  styleUrls: ['./email-box.component.css']
})
export class EmailBoxComponent implements OnInit {
  items!: any;
  constructor() {
  }
  ngOnInit() {
    this.items = [
      { label: "inbox", icon: "pi pi-folder", routerLink: "inbox" },
      { label: "finance", icon: "pi pi-folder", routerLink: "finance" },
      { label: "travel", icon: "pi pi-folder", routerLink: "travel" },
      { label: "personal", icon: "pi pi-folder", routerLink: "personal" },
      { label: "spam", icon: "pi pi-folder", routerLink: "spam" }
    ]
  }
}
