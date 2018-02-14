import { WhiskyEvent } from './../dashboard/event-feed/event';
import { CreateEventService } from './create-event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  template: `
  <div class="main-container col-4">
  <h1>Create New Event</h1>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group row">
        <label for="name" class="col-2">Whisky Name</label>
        <input type="text" class="form-control col-10" id="name" [(ngModel)]="event.whiskyName" name="name" placeholder="'Jake Daniels'">
      </div>
      <div class="form-group row">
        <label for="description" class="col-2">Description</label>
        <textarea type="text" class="form-control col-10" id="description" name="description" [(ngModel)]="event.description"></textarea>
      </div>
      <div class="form-group row">
        <label for="imageUrl" class="col-2">Image URL</label>
        <input type="text" class="form-control col-10" id="imageUrl" [(ngModel)]="event.imageUrl" name="imageUrl">
      </div>
      <div class="form-group row">
        <label for="date" class="col-2">Date</label>
        <input type="date" class="form-control col-10" id="date" [(ngModel)]="event.date" name="date">
      </div>
      <button type="submit" class="jbutton">Submit</button>
    </form>
  </div>

  `,
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  event: WhiskyEvent = {
    id: '',
    whiskyName: '',
    description: '',
    imageUrl: '',
    date: ''
  };

  constructor(
    private createService: CreateEventService
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.createService.saveEvent(this.event);
  }

}
