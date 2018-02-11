import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { EventService } from './event-feed/event.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule
  ],
  declarations: [DashboardComponent, EventFeedComponent],
  providers: [EventService]
})
export class DashboardModule { }
