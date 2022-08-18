import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PhonePipePipe } from './custom-pipe/phone-pipe.pipe';
import { DateFormatPipe } from './custom-pipe/date-format.pipe';
import { FilterPipe } from './custom-pipe/filter.pipe';
import { SortPipe } from './custom-pipe/sort.pipe';
import { ActionViewComponent } from './components/action-view/action-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    AppComponent,
    PhonePipePipe,
    DateFormatPipe,
    SortPipe,
    ActionViewComponent,
    ListViewComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule

  ],
  providers: [
    PhonePipePipe,
    DateFormatPipe,
    SortPipe,
    FilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
