import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { EmailBoxComponent } from './components/email-box/email-box.component';
import { EmailPreviewComponent } from './components/email-preview/email-preview.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmailComponent } from './components/email/email.component';
import { SenderPipe } from './pipes/sender.pipe';
import { EmailContentComponent } from './components/email-content/email-content.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavbarComponent,
        ContactComponent,
        PreferencesComponent,
        EmailBoxComponent,
        EmailPreviewComponent,
        PageNotFoundComponent,
        EmailComponent,
        SenderPipe,
        EmailContentComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TabMenuModule,
        MenubarModule,
        ButtonModule,
        PanelMenuModule,
        TableModule,
        DropdownModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
