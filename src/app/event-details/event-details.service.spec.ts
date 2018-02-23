import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {WhiskyEvent} from './../dashboard/event-feed/event';
import {TestBed, inject} from '@angular/core/testing';

import {EventDetailsService} from './event-details.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

let mockEvent: WhiskyEvent = {
  id: 'whisky-123',
  whiskyName: 'Smokey AF Scotch',
  description: 'It\'s smokey AF',
  date: '2018-01-12',
  attendees: []
};

let mockCollection = {
  valueChanges: jest.fn(() => Observable.of([mockEvent])),
  add: jest.fn()
};

const mockDB = {
  collection: jest.fn(() => mockCollection)
};

const routeStub = {
  snapshot: {paramMap: {get: jest.fn((id) => id)}}
};


describe('EventDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventDetailsService,
        {provide: AngularFirestore, useValue: mockDB},
        {provide: ActivatedRoute, useValue: routeStub}
      ]
    });
    mockEvent = {
      id: 'whisky-123',
      whiskyName: 'Smokey AF Scotch',
      description: 'It\'s smokey AF',
      date: '2018-01-12',
      attendees: []
    };

    mockCollection = {
      valueChanges: jest.fn(() => Observable.of([mockEvent])),
      add: jest.fn()
    };
  });

  it('should be created', inject([EventDetailsService], (service: EventDetailsService) => {
    expect(service).toBeTruthy();
  }));

  describe('loadEvent', () => {
    it('should get the hero with the requested id', inject([EventDetailsService], async (service: EventDetailsService) => {
      service.loadEvent('whisky-123');
      service.event$$.subscribe(event => expect(event).toEqual(mockEvent));
    }));
    it('should load the WhiskyEvent collection from firestore', inject([EventDetailsService], async (service: EventDetailsService) => {
      service.loadEvent('whisky-123');
      expect(mockDB.collection).toHaveBeenCalledWith('whiskyEvent');
    }));
  });

  describe('attendEvent', () => {

    it('should add the specified user to the event', inject([EventDetailsService], (service: EventDetailsService) => {
      service.eventCollection = mockCollection as AngularFirestoreCollection;
      service.attendEvent('whisky-123', 'user-123');
      service.event$$.subscribe(event => expect(event.attendees.length).toBe(1));
    }));

    it('should save the event in firestore', inject([EventDetailsService], (service: EventDetailsService) => {
      service.eventCollection = mockCollection as AngularFirestoreCollection;
      service.event$$.next(mockEvent);
      service.attendEvent('whisky-123', 'user-123');
      const expectedCall: WhiskyEvent = {
        id: 'whisky-123',
        whiskyName: 'Smokey AF Scotch',
        description: 'It\'s smokey AF',
        date: '2018-01-12',
        attendees: ['user-123']
      };
      expect(mockCollection.add).toHaveBeenCalledWith(expectedCall);
    }));

    it('should not update the event if the user already attended', inject([EventDetailsService], (service: EventDetailsService) => {
      service.eventCollection = mockCollection as AngularFirestoreCollection;
      const eventWithUserAlreadyIn = mockEvent;
      const userId = 'user-123';
      eventWithUserAlreadyIn.attendees.push(userId);
      service.event$$.next(eventWithUserAlreadyIn);
      service.attendEvent('whisky-123', userId);
      service.event$$.subscribe(event => expect(event.attendees.length).toBe(1));
    }));

    it('should not save the event in firestore if user already attended', inject([EventDetailsService], (service: EventDetailsService) => {
      service.eventCollection = mockCollection as AngularFirestoreCollection;
      const eventWithUserAlreadyIn = mockEvent;
      const userId = 'user-123';
      eventWithUserAlreadyIn.attendees.push(userId);
      service.event$$.next(eventWithUserAlreadyIn);
      service.attendEvent('whisky-123', userId);
      expect(mockCollection.add).not.toHaveBeenCalled();
    }));
  });

});
