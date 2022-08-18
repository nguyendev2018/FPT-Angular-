import { EmailPreferencesComponent } from './email-preferences/email-preferences.component';
import { EmailContactsComponent } from './email-contacts/email-contacts.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { EmailPreviewComponent } from './email-preview/email-preview.component';
import { EmailBoxComponent } from './email-box/email-box.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes =
  [

    {
      path: 'mymessages', component: EmailBoxComponent,
      children: [
        { path: '', redirectTo: '/mymessages', pathMatch: "full" },
        {
          path: ':path',
          component: EmailPreviewComponent,
          children: [
            {
              path: ':id',
              component: EmailDetailComponent
            }
          ]
        }
      ]
    },
    { path: 'contacts', component: EmailContactsComponent },
    { path: 'preferences', component: EmailPreferencesComponent },
    { path: '', redirectTo: 'mymessages', pathMatch: "full" },
    { path: '**', component: EmailPreferencesComponent }

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
