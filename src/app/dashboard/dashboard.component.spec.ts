import { Router } from '@angular/router';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../core/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { EventService } from './event-feed/event.service';
import { EventFeedComponent } from './event-feed/event-feed.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const AuthServiceStub = {
    user: Observable.of({displayName: 'mr person'})
  };

  const EventServiceStub = {
    eventFeed$: Observable.of([{id: 'event-123'}])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, EventFeedComponent ],
      providers: [
        {provide: EventService, useValue: EventServiceStub},
        {provide: Router, useValue: {}}
      ],
      imports: [
        AngularFirestoreModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the feed on initialization', () => {
    component.eventFeed$.subscribe(events => expect(events.length).toBeGreaterThan(0));
  });
});
