import { CreateEventModule } from './create-event/create-event.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import {environment} from './../environments/environment';
import {CoreModule} from './core/core.module';
import {LoginModule} from './login/login.module';
import {AppRoutingModule} from './routing.module';
import {DashboardModule} from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CoreModule,
    LoginModule,
    AppRoutingModule,
    DashboardModule,
    CreateEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
