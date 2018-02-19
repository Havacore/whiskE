import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details.component';
import { EventDetailsService } from './event-details.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EventDetailsComponent],
  providers: [EventDetailsService]
})
export class EventDetailsModule { }
