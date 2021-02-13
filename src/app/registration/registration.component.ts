import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import {AuthService} from "../auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

    angForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

      this.angForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  ngOnInit(): void {
  }

  postdata(angForm1: FormGroup){
    console.log("email : " + angForm1.value.email)
    console.log("mot de passe : " + angForm1.value.password)
      this.authService.userRegistration(angForm1.value.email, angForm1.value.password)
        .pipe(first())
        .subscribe(
          data =>{
            this.router.navigate(['connexion'])
          },
          error => {
            alert("Impossible d'enregister cet utilisateur")
          })
  }

  get email(){
      return this.angForm.get('email')
  }

  get password(){
    return this.angForm.get('password')
  }

}
