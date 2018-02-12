import { DashboardComponent } from './../dashboard.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFeedComponent } from './event-feed.component';
import { EventService } from './event.service';

describe('EventFeedComponent', () => {
  let component: EventFeedComponent;
  let fixture: ComponentFixture<EventFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFeedComponent, DashboardComponent ],
      providers: [
        {provide: EventService, useValue: {}}
      ],
      imports: [
        AngularFirestoreModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formatDate', () => {
    it('should format the date to a pretty date from the y/m/d version', () => {
      const expected = 'February 20, 2018';
      const result = component.formatDate('2018-02-20');
      expect(result).toBe(expected);
    });
  });

});
