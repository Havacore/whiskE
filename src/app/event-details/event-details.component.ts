import {ActivatedRoute} from '@angular/router';
import {EventDetailsService} from './event-details.service';
import {Component, OnInit} from '@angular/core';
import {WhiskyEvent} from '../dashboard/event-feed/event';
import {Observable} from 'rxjs/Observable';
import {Util} from '../util';

@Component({
  selector: 'app-event-details',
  template: `
    <div *ngIf="eventDetails$ | async as eventDetails; else loading">
      <h1 class="col-4">{{eventDetails.whiskyName}}</h1>
      <div class="main-container col-4">
        <div class="event-details row">
          <div class="event-details__picture col-4">
            <img [src]="eventDetails.imageUrl"/>
          </div>
          <div class="col-8">
            <div class="event-details__date-box">
              <h3 [innerHTML]="formatDate(eventDetails.date)"></h3>
              <button class="jbutton" [innerHTML]="getButtonText()"></button>
            </div>
            <div>{{ eventDetails.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <ng-template #loading>
      Loading...
    </ng-template>
  `,
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private eventService: EventDetailsService, private route: ActivatedRoute) {
  }

  formatDate(datestring: string): string {
    return Util.formatDate(datestring);
  }

  ngOnInit() {
    this.eventService.loadEvent(this.route.snapshot.paramMap.get('eventId'));
  }

  getButtonText(): string {
    return 'Attend Event';
  }

  get eventDetails$(): Observable<WhiskyEvent> {
    return this.eventService.event$;
  }

}
