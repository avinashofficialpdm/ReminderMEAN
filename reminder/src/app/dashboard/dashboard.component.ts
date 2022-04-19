import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataServiceService } from '../Services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  date = Date
  event = ""
  user:any
  nowUser:any

  addEvent(){

    var newDate=this.date
    var newEvent=this.event
    let user = localStorage.getItem("currentUsername")
    // console.log(user);
    
    
    this.ds.addEvent(newDate,newEvent,user)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        this.routerLogin.navigateByUrl("dashboard")
        this.event=""
      }
    },
    (result)=>{
      alert(result.error.message)
    })
  }

  logout(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentUsername")
    this.routerLogin.navigateByUrl("login")
  }
  constructor( private ds:DataServiceService,private routerLogin:Router) { 

    if(localStorage.getItem("currentUser")){
      this.nowUser=localStorage.getItem("currentUser")
    }else{
      alert("Please Login")
      this.routerLogin.navigateByUrl("login")
    }

  }

  ngOnInit(): void {
  }



}    


