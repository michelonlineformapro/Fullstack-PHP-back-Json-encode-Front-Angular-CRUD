import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Router} from "@angular/router";
//Toast Alert
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm:FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private router: Router) {
    this.angForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['']
    })
  }

  ngOnInit(){
    this.toastService.warning("Vous êtes déconnectez", "FULLSTACK ANGULAR API REST PHP")
  }


  postdata(angForm1){

      this.authService.userLogin(angForm1.value.email, angForm1.value.password)
        .pipe(first())
        .subscribe(
          data => {
            const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/administration';
            this.router.navigate([redirect])
          },
          error => {
            console.log("email de puis login.ts : " + this.email.value)
            console.log("mot de passe depuis login .ts : " + this.password.value)
            alert("Votre email ou mot de passe sont incorrect !")
          })
    }

    get email(){
    return this.angForm.get('email')
    }

    get password(){
      return this.angForm.get('password')
    }

}
