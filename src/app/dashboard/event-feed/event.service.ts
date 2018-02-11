
import { Injectable } from '@angular/core';
import { WhiskyEvent } from './event';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

const bogusEvent: WhiskyEvent = {
  id: 'event-123',
  // tslint:disable-next-line:max-line-length
  description: 'The new 46% Amruts are a very different proposition to the pleasant but unexciting original release. At the higher strength this 24ppm peated effort fairly fizzes along the tastebuds. This is excellent - hugely improved stuff from a distillery coming along in leaps and bounds.',
  // tslint:disable-next-line:max-line-length
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/rocket-studios.appspot.com/o/india_amr7.jpg?alt=media&token=fd4b4549-3dc5-46a6-8241-c5d1c8123919',
  whiskyName: 'Amrut Peated',
  date: ''
};

const emptyEvent: WhiskyEvent = {
  id: '',
  description: '',
  whiskyName: '',
  date: ''
};

@Injectable()
export class EventService {

  eventFeed$$: BehaviorSubject<Array<WhiskyEvent>> = new BehaviorSubject<Array<WhiskyEvent>>([emptyEvent]);
  eventCollection: AngularFirestoreCollection<WhiskyEvent>;

  constructor(
    private db: AngularFirestore
  ) {
    this.initializeEventFeed();
  }

  initializeEventFeed(): void {
    this.eventCollection = this.db.collection('whiskyEvent');
    console.log(this.eventCollection);
  }

  get eventFeed$(): Observable<Array<WhiskyEvent>> {
    return this.eventFeed$$.asObservable();
  }

}
