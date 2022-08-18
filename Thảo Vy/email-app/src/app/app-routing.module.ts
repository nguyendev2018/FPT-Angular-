import { EmailComponent } from './email/email.component';
import { EmailPreferencesComponent } from './email-preferences/email-preferences.component';
import { EmailContactsComponent } from './email-contacts/email-contacts.component';
import { AppComponent } from './app.component';
import { EmailPreviewComponent } from './email-preview/email-preview.component';
import { EmailBoxComponent } from './email-box/email-box.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailDetailComponent } from './email-detail/email-detail.component';

const routes: Routes = [
  {
    path: 'messages',
    component: EmailComponent,
    children: [
      {
        path: ':option',
        component: EmailPreviewComponent,
        children: [
          {
            path: ':id',
            component: EmailDetailComponent,
          },
        ],
      },
    ],
  },
  { path: 'contacts', component: EmailContactsComponent },
  { path: 'preferences', component: EmailPreferencesComponent },
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
