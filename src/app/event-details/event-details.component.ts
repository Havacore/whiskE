import { EventDetailsService } from './event-details.service';
import { Component, OnInit } from '@angular/core';
import { WhiskyEvent } from '../dashboard/event-feed/event';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event-details',
  template: `
  <div *ngIf="eventDetails$ | async as eventDetails; else loading">
    Here is some whisky
  </div>
  <ng-template #loading>
    Loading...
  </ng-template>
  `,
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private eventService: EventDetailsService) { }

  ngOnInit() {
  }

  get eventDetails$(): Observable<WhiskyEvent> {
    return this.eventService.event$;
  }

}
