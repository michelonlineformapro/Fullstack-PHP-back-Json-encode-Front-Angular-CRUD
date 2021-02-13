import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup
  isSubmitted: boolean

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb:FormBuilder
  ) { }

  ngOnInit(){}

}
