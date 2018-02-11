import { WhiskyEvent } from './../dashboard/event-feed/event';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class CreateEventService {

  eventCollection: AngularFirestoreCollection<WhiskyEvent>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.getEventCollection();
  }

  getEventCollection(): void {
    this.eventCollection = this.db.collection('whiskyEvent');
  }


  public saveEvent(event: WhiskyEvent) {

    event.id = event.id === '' ? 'whiskyevent-' + uuid() : event.id;
    this.eventCollection.add(event);
  }

}
