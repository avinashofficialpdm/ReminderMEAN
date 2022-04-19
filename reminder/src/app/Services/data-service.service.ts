import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  register( uname: any,name:any,pswd: any) {
    //json data
    const data = {
      uname,name,pswd
    }
    // //register API
    return this.http.post('http://localhost:3000/register', data)
  }

  login( uname: any,pswd: any) {
    //json data
    const data = {
      uname,pswd
    }
    // //register API
    return this.http.post('http://localhost:3000/login', data)
  }

  addEvent(date:any,event:any,user:any){
    const data = {
      date,event,user
    }
    // console.log(data);
    
    return this.http.post('http://localhost:3000/addEvent', data)

  }

  viewEvents(user:any){
    const data= {
      user
    }
    return this.http.post('http://localhost:3000/viewEvent', data)

  }

  deleteEvents(user:any,date:any,event:any){
    const data= {
      user,
      date,
      event
    }
    return this.http.post('http://localhost:3000/deleteEvent', data)

  }


  updateEvent(uname:any,index:any,date:any,event:any){
    const data= {
      uname,
      index,
      date,
      event
    }
    return this.http.post('http://localhost:3000/updateEvent', data)
  }
  

  constructor(private http:HttpClient) {
    
   }
}
