import { WhiskyEvent } from './../dashboard/event-feed/event';
import { AngularFireDatabase } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';

import { CreateEventService } from './create-event.service';

const angularFireDBMock = {
  database: {
    ref: jest.fn(() => {
      return { set: jest.fn(() => undefined)};
      })
  }
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
        {provide: AngularFireDatabase, useValue: angularFireDBMock}
      ]
    });
  });

  it('should be created', inject([CreateEventService], (service: CreateEventService) => {
    expect(service).toBeTruthy();
  }));

  describe('saveEvent', () => {
    it('should generate a uuid for the event if there isn\'t one', inject([CreateEventService], (service: CreateEventService) => {
      service.saveEvent(eventWithoutUUID);
      expect(service.db.database.ref).toHaveBeenCalled();
    }));

    it('should use the uuid on the event object if there is one', inject([CreateEventService], (service: CreateEventService) => {
      service.saveEvent(eventWithUUID);
      expect(service.db.database.ref).toHaveBeenCalledWith('/whiskyEvent/uid-123');
    }));
  });
});
