import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './create-event/create-event.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './core/auth.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard]},
  { path: 'event/:eventId', component: EventDetailsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', component: LoginComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
