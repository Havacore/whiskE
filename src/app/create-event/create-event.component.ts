import { CreateEventService } from './create-event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  template: ``,
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(
    private createService: CreateEventService
  ) { }

  ngOnInit() {
  }

}
