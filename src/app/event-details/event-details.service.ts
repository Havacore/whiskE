import { AngularFirestore } from 'angularfire2/firestore';
import { WhiskyEvent } from './../dashboard/event-feed/event';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


const bogusEvent: WhiskyEvent = {
  id: '',
  whiskyName: '',
  description: '',
  date: ''
};

@Injectable()
export class EventDetailsService {

  event$$: BehaviorSubject<WhiskyEvent> = new BehaviorSubject<WhiskyEvent>(bogusEvent);

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
    this.loadEvent(this.route.snapshot.paramMap.get('eventId'));
  }

   loadEvent(eventId: string): void {
    this.db.collection('whiskyEvent', ref => ref.where('eventId', '==', eventId)).valueChanges().subscribe((result: Array<WhiskyEvent>) => {
      this.event$$.next(result[0]);
    });
   }

   get event$(): Observable<WhiskyEvent> {
     return this.event$$.asObservable();
   }

}
