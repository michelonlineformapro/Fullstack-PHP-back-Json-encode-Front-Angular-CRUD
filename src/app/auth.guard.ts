import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //Init auth service qui contiens 3 fonction signIn isLoggeIn et logout
  constructor(private authService: AuthService, private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const routeUrl: string = state.url
    return this.isLogin(routeUrl)
  }


  isLogin(routeurl: string){
    if(this.authService.isLoggedIn()){
      return true
    }
    this.authService.redirectUrl = routeurl
    this.router.navigate(['/connexion'], {queryParams: {returnUrl: routeurl }})
  }
}
