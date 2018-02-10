import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { WhiskyEvent } from './event';
import { Observable } from 'rxjs/Observable';

const bogusEvent: WhiskyEvent = {
  id: 'event-123'
};

@Injectable()
export class EventService {

  eventFeed$$: BehaviorSubject<Array<WhiskyEvent>> = new BehaviorSubject<Array<WhiskyEvent>>([bogusEvent]);

  constructor() { }

  get eventFeed$(): Observable<Array<WhiskyEvent>> {
    return this.eventFeed$$.asObservable();
  }

}
