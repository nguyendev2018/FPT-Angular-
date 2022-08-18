import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  faPlus = faPlus;
  @Output() addItem = new EventEmitter();
  toDoForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  constructor() {}

  ngOnInit(): void {}
  handleAdd(): void {
    //this.toDoForm.markAllAsTouched();
    if (this.toDoForm.invalid) return;
    this.addItem.emit(this.toDoForm.get('name')?.value);
    this.toDoForm.reset();
  }
}
