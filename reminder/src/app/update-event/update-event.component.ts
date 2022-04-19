import { Component, OnInit } from '@angular/core';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  // editingEvent:any

  constructor() { }

  // editingEvent = this.eventComp.toBeEdited


  ngOnInit(): void {
  }

}
