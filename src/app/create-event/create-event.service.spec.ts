import { AngularFirestore } from 'angularfire2/firestore';
import { WhiskyEvent } from './../dashboard/event-feed/event';
import { TestBed, inject } from '@angular/core/testing';

import { CreateEventService } from './create-event.service';
import { Observable } from 'rxjs/Observable';

const angularFireDBMock = {
  collection: jest.fn(() => {
    return { add: jest.fn() };
  })
};

const eventWithoutUUID: WhiskyEvent = {
  id: '',
  whiskyName: 'whisky-name',
  description: 'description',
  imageUrl: 'url'
};

const eventWithUUID: WhiskyEvent = {
  id: 'uid-123',
  whiskyName: 'whisky-name',
  description: 'description',
  imageUrl: 'url'
};

describe('CreateEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateEventService,
        {provide: AngularFirestore, useValue: angularFireDBMock}
      ]
    });
  });

  it('should be created', inject([CreateEventService], (service: CreateEventService) => {
    expect(service).toBeTruthy();
  }));


  it('should generate a uuid for the event if there isn\'t one', inject([CreateEventService], (service: CreateEventService) => {
    service.saveEvent(eventWithoutUUID);
    expect(service.eventCollection.add).toHaveBeenCalled();
  }));

  it('should use the uuid on the event object if there is one', inject([CreateEventService], (service: CreateEventService) => {
    service.saveEvent(eventWithUUID);
    expect(service.eventCollection.add).toHaveBeenCalledWith(eventWithUUID);
  }));
});
