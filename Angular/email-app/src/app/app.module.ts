import { EmailService } from '../core/services/email.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { TabMenuModule } from 'primeng/tabmenu';
import { MessageModule } from 'primeng/message';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { Pipe } from '@angular/core';
import { BodyPiPe } from '../core/pipe/body.pipe';

import { LimitCharsPipe } from './../core/pipe/limitChars.pipe';
import { AppComponent } from './app.component';
import { EmailBoxComponent } from './email-box/email-box.component';
import { EmailPreviewComponent } from './email-preview/email-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { EmailContactsComponent } from './email-contacts/email-contacts.component';
import { EmailPreferencesComponent } from './email-preferences/email-preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailBoxComponent,
    EmailPreviewComponent,
    EmailDetailComponent,
    BodyPiPe,
    LimitCharsPipe,
    EmailContactsComponent,
    EmailPreferencesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ListboxModule,
    FormsModule,
    MessageModule,
    AppRoutingModule,
    MenuModule,
    TabMenuModule,
    ButtonModule,
    RippleModule,
    MegaMenuModule,
    TableModule
  ],
  providers: [EmailService, Pipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
