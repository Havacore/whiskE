import { ActivatedRoute } from '@angular/router';
import { EventDetailsService } from './event-details.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  const eventServiceStub = {
    loadEvent: jest.fn(() => undefined)
  };

  const routeStub = {
    snapshot: {paramMap: {get: jest.fn((id) => id)}}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsComponent ],
      providers: [
        {provide: EventDetailsService, useValue: eventServiceStub},
        {provide: ActivatedRoute, useValue: routeStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
