import { ActivatedRoute } from '@angular/router';
import { EventDetailsService } from './event-details.service';
import { Component, OnInit } from '@angular/core';
import { WhiskyEvent } from '../dashboard/event-feed/event';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event-details',
  template: `
  <div *ngIf="eventDetails$ | async as eventDetails; else loading">
    {{eventDetails.whiskyName}}
  </div>
  <ng-template #loading>
    Loading...
  </ng-template>
  `,
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private eventService: EventDetailsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventService.loadEvent(this.route.snapshot.paramMap.get('eventId'));
  }

  get eventDetails$(): Observable<WhiskyEvent> {
    return this.eventService.event$;
  }

}
