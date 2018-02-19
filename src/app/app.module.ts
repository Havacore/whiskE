import { EventDetailsModule } from './event-details/event-details.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { CreateEventModule } from './create-event/create-event.module';
import {environment} from './../environments/environment';
import {CoreModule} from './core/core.module';
import {LoginModule} from './login/login.module';
import {AppRoutingModule} from './routing.module';
import {DashboardModule} from './dashboard/dashboard.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    CoreModule,
    LoginModule,
    AppRoutingModule,
    DashboardModule,
    CreateEventModule,
    EventDetailsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
