import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { EmailBoxComponent } from './email-box/email-box.component';
import { EmailPreviewComponent } from './email-preview/email-preview.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EmailContactsComponent } from './email-contacts/email-contacts.component';
import { EmailPreferencesComponent } from './email-preferences/email-preferences.component';
import { EmailComponent } from './email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailBoxComponent,
    EmailPreviewComponent,
    EmailDetailComponent,
    EmailContactsComponent,
    EmailPreferencesComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabViewModule,
    DropdownModule,
    ReactiveFormsModule,
    MenuModule,
    TieredMenuModule,
    TableModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
