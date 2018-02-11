import { WhiskyEvent } from './../dashboard/event-feed/event';
import { CreateEventService } from './create-event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  template: `
  <div class="main-container">
    <h1>Create New Event</h1>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Whisky Name</label>
        <input type="text" class="form-control" id="name" [(ngModel)]="event.whiskyName" name="name">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea type="text" class="form-control" id="description" name="description" [(ngModel)]="event.description"></textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input type="text" class="form-control" id="imageUrl" [(ngModel)]="event.imageUrl" name="imageUrl">
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" class="form-control" id="date" [(ngModel)]="event.date" name="date">
      </div>
      <button type="submit" class="jbutton">Submit</button>
    </form>
    name: {{event.whiskyName}} \n
    description: {{event.description}}\n
    id: {{event.id}}\n
    imageUrl: {{event.imageUrl}}\n
    date: {{event.date}}\n
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
