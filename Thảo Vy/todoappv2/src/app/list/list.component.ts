import { ToDo } from './../core/models/todo';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() toDoList!: ToDo[];
  @Input() str!: string | undefined;
  @Output() changeStatus = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() upPriority = new EventEmitter();
  @Output() downPriority = new EventEmitter();
  s: string = 'Test';
  constructor() {}

  //ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges Parent');
    //console.log(changes);
  }

  ngOnInit(): void {
    console.log('OnInit Parent');
    //console.log(this.itemName);
    //console.log(this.content);
  }

  ngDoCheck(): void {
    console.log('DoCheck Parent');
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit Parent');
    //console.log(this.content.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentChecked Parent');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit Parent');
    //console.log(this.itemName.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked Parent');
  }

  ngOnDestroy(): void {
    console.log('OnDestroy Parent');
  }
}
