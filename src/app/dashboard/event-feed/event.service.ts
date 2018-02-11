
import { Injectable } from '@angular/core';
import { WhiskyEvent } from './event';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const bogusEvent: WhiskyEvent = {
  id: 'event-123',
  // tslint:disable-next-line:max-line-length
  description: 'The new 46% Amruts are a very different proposition to the pleasant but unexciting original release. At the higher strength this 24ppm peated effort fairly fizzes along the tastebuds. This is excellent - hugely improved stuff from a distillery coming along in leaps and bounds.',
  // tslint:disable-next-line:max-line-length
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/rocket-studios.appspot.com/o/india_amr7.jpg?alt=media&token=fd4b4549-3dc5-46a6-8241-c5d1c8123919',
  whiskyName: 'Amrut Peated'
};

@Injectable()
export class EventService {

  eventFeed$$: BehaviorSubject<Array<WhiskyEvent>> = new BehaviorSubject<Array<WhiskyEvent>>([bogusEvent, bogusEvent]);

  constructor() { }

  get eventFeed$(): Observable<Array<WhiskyEvent>> {
    return this.eventFeed$$.asObservable();
  }

}
