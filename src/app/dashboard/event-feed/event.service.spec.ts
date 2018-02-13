import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { EventService } from './event.service';
import {Observable} from 'rxjs/Observable';

describe('EventService', () => {

  let service;
  const mockDb = {
    collection: jest.fn(() => {
      return {valueChanges: jest.fn(() => Observable.of({}))};
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        {provide: AngularFirestore, useValue: mockDb}
      ]
    });
    service = TestBed.get(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
