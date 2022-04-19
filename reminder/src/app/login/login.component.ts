import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../Services/data-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname = ""
  pswd = ""
  currentUser: any


  loginForm = this.fb.group({
    //form array create
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb: FormBuilder, private ds: DataServiceService, private routerLogin: Router) { }

  ngOnInit(): void {
  }

  login() {
    var uname = this.loginForm.value.uname
    var pswd = this.loginForm.value.pswd

    if (this.loginForm.valid) {
      //asychronous
      this.ds.login(uname, pswd)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            localStorage.setItem("currentUser", result.newUser)
            localStorage.setItem("currentUsername", result.newUsername)
            this.routerLogin.navigateByUrl("dashboard")
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert("Invalid Form")
    }
  }
}
