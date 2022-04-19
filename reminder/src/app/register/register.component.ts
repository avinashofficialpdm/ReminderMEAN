import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../Services/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname=""
  pswd=""
  name=""

  registerForm = this.fb.group({
    //form array create
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
  })

  constructor(private fb:FormBuilder,private ds:DataServiceService,private routerLogin:Router) { }

  ngOnInit(): void {
  }

  register(){
    var uname=this.registerForm.value.uname
    var pswd=this.registerForm.value.pswd
    var name=this.registerForm.value.name


    if(this.registerForm.valid){
      //asychronous
      this.ds.register(uname,name,pswd)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
          this.routerLogin.navigateByUrl("login")

        }
      },
      (result)=>{
        alert(result.error.message)
      }
      )
 
     }
     else{
       alert("Invalid Form")
     }    
  }

}
