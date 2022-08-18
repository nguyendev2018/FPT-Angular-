import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  name: string = "";
  email: string = "";
  constructor() { }
  submit() {

  }
  ngOnInit(): void {

  }

}
