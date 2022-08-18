import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { PhonePipe } from './phone.pipe';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from './order-by.pipe';
import { IconDirective } from './icon.directive';

@NgModule({
  declarations: [AppComponent, PhonePipe, OrderByPipe, IconDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
