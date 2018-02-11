import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { EventService } from './event.service';

describe('EventService', () => {

  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        {provide: AngularFirestore, useValue: {}}
      ]
    });
    service = TestBed.get(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initializeEventFeed', () => {
    it('should initialize the event feed', () => {

      service.initializeEventFeed();
      service.eventFeed$$.subscribe((feed) => expect(feed[0].whiskyName).toBe('amrut peated'));
    });
  });
});
