import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { EventService } from './event-feed/event.service';
import { Observable } from 'rxjs/Observable';
import { WhiskyEvent } from './event-feed/event';

@Component({
  selector: 'app-dashboard',
  template: `
<div class="feed-container">
  <h1>Latest Whisky Tastings</h1>
  <app-event-feed></app-event-feed>
</div>
`,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
  }

  get eventFeed$(): Observable<Array<WhiskyEvent>> {
    return this.eventService.eventFeed$;
  }

}
