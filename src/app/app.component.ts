import { Component } from '@angular/core';
import { AuthService } from "./auth.service";
//Toast alert
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loginbtn: boolean
  logoutbtn:boolean

  constructor(
    private authService: AuthService,
    private toastService: ToastrService
    ) {
    authService.getLoggedInName.subscribe(
        name => this.changeName(name))
    if(this.authService.isLoggedIn())
    {
      console.log("Vous êtes connectez");
      this.loginbtn=false;
      this.logoutbtn=true
    }
    else{
      this.loginbtn=true;
      this.logoutbtn=false
    }

  }
  title = 'Fullstack Angular API REST PHP';

  private changeName(name: any): void {
    this.logoutbtn = name;
    this.loginbtn = !name;

  }
  logout()
  {
    this.toastService.success("Vous êtes deconnectez", "FULLSTACK ANGULAR API REST PHP")
    this.authService.deleteToken();
    window.location.href = window.location.href;
  }
}
