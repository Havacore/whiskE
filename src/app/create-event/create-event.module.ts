import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event.component';
import { CreateEventService } from './create-event.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateEventComponent],
  providers: [CreateEventService]
})
export class CreateEventModule { }
