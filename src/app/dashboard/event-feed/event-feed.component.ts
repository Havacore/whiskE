import {EventService} from './event.service';
import {Component, OnInit, Input} from '@angular/core';
import {WhiskyEvent} from './event';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Util} from '../../util';

@Component({
  selector: 'app-event-feed',
  template: `
    <div *ngFor="let event of events$ | async">
      <div class="jcard feed-card col-4" (click)="navigateToEvent(event.id)">
        <div class="feed-card__picture">
          <img [src]="event.imageUrl"/>
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

  formatDate(dateString: string): string {
    return Util.formatDate(dateString);
  }

  constructor(private eventService: EventService,
              private router: Router) {
  }

  ngOnInit() {
  }


  navigateToEvent(eventID: string): void {
    this.router.navigate(['event', eventID]);
  }

  get events$(): Observable<Array<WhiskyEvent>> {
    return this.eventService.eventFeed$;
  }

}
