import { AngularFirestore } from 'angularfire2/firestore';
import { WhiskyEvent } from './../dashboard/event-feed/event';
import { TestBed, inject } from '@angular/core/testing';

import { EventDetailsService } from './event-details.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

const mockEvent: WhiskyEvent = {
  id: 'whisky-123',
  whiskyName: 'Smokey AF Scotch',
  description: 'It\'s smokey AF',
  date: '2018-01-12'
};

const mockDB = {
  collection: jest.fn(() => {
    return {
      valueChanges: jest.fn(() => Observable.of([mockEvent]))
    };
  })
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
  });

  it('should be created', inject([EventDetailsService], (service: EventDetailsService) => {
    expect(service).toBeTruthy();
  }));

  describe('loadEvent', () => {
    it('should get the hero with the requested id', inject([EventDetailsService], (service: EventDetailsService) => {
      service.loadEvent('whisky-123');
      service.event$$.subscribe((event) => expect(event).toEqual(mockEvent));
    }));
  });


});
