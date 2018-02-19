import { EventService } from './event.service';
import { Component, OnInit, Input } from '@angular/core';
import { WhiskyEvent } from './event';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event-feed',
  template: `
  <div *ngFor="let event of events$ | async">
    <div class="jcard feed-card col-4">
        <div class="feed-card__picture">
            <img [src]="event.imageUrl" />
        </div>
        <div class="feed-card__description">
          <h2>{{ event.whiskyName }}</h2>
          <h3 [innerHTML]="formatDate(event.date)"></h3>
          <div>{{ event.description }}</div>
        </div>
    </div>
  </div>
`,
  styleUrls: ['./event-feed.component.scss']
})
export class EventFeedComponent implements OnInit {

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
  }

  formatDate(datestring: string): string {
    const monthNames =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
    const date = new Date(datestring);
    return monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear() ;
  }

  get events$(): Observable<Array<WhiskyEvent>> {
    return this.eventService.eventFeed$;
  }

}
