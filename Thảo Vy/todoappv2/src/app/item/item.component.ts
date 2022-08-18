import { ToDo } from './../core/models/todo';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { AfterViewChecked } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent
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
  faDown = faAngleDown;
  faUp = faAngleUp;
  @Input() item!: ToDo;
  @Input() str!: string | undefined;
  @Output() changeStatus = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() upPriority = new EventEmitter();
  @Output() downPriority = new EventEmitter();
  @ViewChild('itemName') itemName!: ElementRef;
  @ContentChild('content') content!: ElementRef;
  constructor() {
    console.log('Constructor');
    //console.log(this.itemName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
    //console.log(changes);
  }

  ngOnInit(): void {
    console.log('OnInit');
    //console.log(this.itemName);
    console.log(this.content);
  }

  ngDoCheck(): void {
    console.log('DoCheck');
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit');
    console.log(this.content.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit');
    //console.log(this.itemName.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('OnDestroy');
  }
}
