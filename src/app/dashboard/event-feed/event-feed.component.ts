import { EventService } from './event.service';
import { Component, OnInit, Input } from '@angular/core';
import { WhiskyEvent } from './event';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event-feed',
  template: `
  <div *ngFor="let event of events$ | async">
    <div class="jcard feed-card">
      <div class="feed-card__picture">
          <img [src]="event.imageUrl" />
      </div>
      <div class="feed-card__description">
        <h2>{{ event.whiskyName }}</h2>
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

  get events$(): Observable<Array<WhiskyEvent>> {
    return this.eventService.eventFeed$;
  }

}
