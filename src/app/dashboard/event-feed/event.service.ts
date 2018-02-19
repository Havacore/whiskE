
import { Injectable } from '@angular/core';
import { WhiskyEvent } from './event';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class EventService {

  eventCollection: AngularFirestoreCollection<WhiskyEvent>;
  eventCollection$: Observable<Array<WhiskyEvent>>;

  constructor(
    private db: AngularFirestore
  ) {
    this.initializeEventFeed();
  }

  initializeEventFeed(): void {
    this.eventCollection = this.db.collection('whiskyEvent', ref => ref.orderBy('date'));
    this.eventCollection$ = this.eventCollection.valueChanges();
  }

  get eventFeed$(): Observable<Array<WhiskyEvent>> {
    return this.eventCollection$;
  }

}
