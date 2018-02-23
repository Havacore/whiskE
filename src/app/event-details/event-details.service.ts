import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {WhiskyEvent} from './../dashboard/event-feed/event';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';


const bogusEvent: WhiskyEvent = {
  id: '',
  whiskyName: '',
  description: '',
  date: '',
  attendees: []
};

@Injectable()
export class EventDetailsService {

  event$$: BehaviorSubject<WhiskyEvent> = new BehaviorSubject<WhiskyEvent>(bogusEvent);
  eventCollection: AngularFirestoreCollection<WhiskyEvent>;


  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
  }

  loadEvent(eventId: string): void {
    this.eventCollection = this.db.collection('whiskyEvent');
    this.db.collection('whiskyEvent', ref => ref.where('id', '==', eventId)).valueChanges().subscribe((result: Array<WhiskyEvent>) => {
      console.log(result);
      this.event$$.next(result[0]);
    });
  }

  attendEvent(eventId: string, userId: string): void {
    const event = this.event$$.value;
    const existing = event.attendees.find(attendee => attendee === userId);
    if (!existing) {
      event.attendees.push(userId);
      this.event$$.next(event);
      this.eventCollection.add(event);
    }
  }

  get event$(): Observable<WhiskyEvent> {
    return this.event$$.asObservable();
  }

}
