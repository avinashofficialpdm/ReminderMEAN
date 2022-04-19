import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../Services/data-service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventsList: any
  currentUser: any
  toBeEdited: any


  updateIndex:any
  updateDate:any
  updateEvent:any
  constructor(private ds: DataServiceService, private router: Router) {

    let user = localStorage.getItem("currentUsername")

    this.eventsList = this.ds.viewEvents(user)
      .subscribe((result: any) => {
        if (result) {
          this.eventsList = result.events
          console.log(this.eventsList);

        }
      },
        (result) => {
          alert(result.error.message)
        })

  }

  deleteItem(date: any, event: any) {

    let user = localStorage.getItem("currentUsername")

    this.ds.deleteEvents(user, date, event)
      .subscribe((result: any) => {
        if (result) {
          // alert(result.message)
          this.refresh()
          this.router.navigateByUrl("events")
        }
      },
        (result) => {
          alert(result.error.message)
        }
      )

  }


  refresh(): void {
    window.location.reload();
  }

  updateRow(indexNo:any,date:any,event:any){
    document.getElementById("editEvent")?.setAttribute("style","display:block")
    document.getElementById("showEvent")?.setAttribute("style","display:none")
    this.updateIndex=indexNo
    this.updateDate=date
    this.updateEvent=event
  }

  update(index:any,date:any,event:any){
    let user = localStorage.getItem("currentUsername")

    this.ds.updateEvent(user,index, date, event)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          document.getElementById("editEvent")?.setAttribute("style","display:none")
          document.getElementById("showEvent")?.setAttribute("style","display:block")
          this.router.navigateByUrl("events")
          location.reload()
        }
      },
        (result:any) => {
          alert(result.error.message)
        }
      )
  }

  ngOnInit(): void {
  }

}
