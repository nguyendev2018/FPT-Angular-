import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailBoxComponent } from './components/email-box/email-box.component';
import { ContactComponent } from './components/contact/contact.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmailPreviewComponent } from './components/email-preview/email-preview.component';
import { EmailComponent } from './components/email/email.component';
import { EmailContentComponent } from './components/email-content/email-content.component';

const routes: Routes = [
    {
        path: 'message',
        component: EmailComponent,
        children: [
            {
                path: '',
                redirectTo: 'inbox',
                pathMatch: 'full',
            },
            {
                path: ':folder',
                component: EmailPreviewComponent,
            },
            {
                path: 'content/:id',
                component: EmailContentComponent,
                outlet: 'content',
            },
        ],
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'preferences',
        component: PreferencesComponent,
    },
    {
        path: '',
        redirectTo: '/message',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
