import { WhiskyEvent } from './../dashboard/event-feed/event';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateEventService {

  constructor(
    private db: AngularFireDatabase,
  ) { }


  public saveEvent(event: WhiskyEvent) {

    event.id = event.id === '' ? 'whisky-' + uuid() : event.id;
    this.db.database.ref('/whiskyEvent/' + event.id).set(event);
  }

}
