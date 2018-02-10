import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { EventFeedComponent } from './event-feed/event-feed.component';
import { EventService } from './event-feed/event.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, EventFeedComponent],
  providers: [EventService]
})
export class DashboardModule { }
