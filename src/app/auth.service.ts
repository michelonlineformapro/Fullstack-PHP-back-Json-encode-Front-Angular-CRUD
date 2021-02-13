import {EventEmitter, Injectable, Output} from '@angular/core';
//import de interface model
import {User} from "./user";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, map, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string
  baseUrl: string = "http://localhost/admin_ang/adminang/php/"

  @Output() getLoggedInName: EventEmitter<User[]> = new EventEmitter<User[]>()

  constructor(private httpClient: HttpClient, private router: Router) { }


  //fonction de connexion passage des paramètres du model
  public userLogin(email: string, password: string){
    //Appel de toutes les valeurs de php readUser
    return this.httpClient.post<User[]>(this.baseUrl + '/readUsers.php', {email, password})
      //RxJS (Reactive Extensions for JavaScript)  requète asyncrone
      .pipe(map(User =>{
        //Debug f12
        console.log(User)
        console.log("cote back email = " + email)
        console.log("cote back mot de passe = " + password)
        //Boucle pour sortir tous les resultats avec increment let i
        for(let i = 0; i < User.length; i++){

          console.log("DATA de DB : " + User[i].email)
          console.log("DATA de DB : " + User[i].password)
          //Si la valeur du form login == valeur du json et mot de passe
        if(email == User[i].email && password == User[i].password) {
          //Recup du token a l'aide de la methode setToken
          this.setToken(User[i].email, email)

          this.getLoggedInName.emit(User)
          //Retourne la liste des user de php
          return User
          }else{
          console.log("Mot de passe et email invalide")
        }
        }

    }))

  }

  public userRegistration(email, password){
    return this.httpClient.post<any>(this.baseUrl + '/registration.php', {email, password})
      .pipe(map(User => {
        return User
      }))
  }


  isLoggedIn(){
    const userToken = this.getToken()
    return userToken != null;

  }


  //Fonction de deconnexion
  public logout(){
    localStorage.clear()
    this.router.navigate(['/connexion'])
  }


  //Methode readUsers appelée depuis UsersComponent.ts
  getAllUsersService(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl + '/readUsers.php')
  }


  //
  setToken(token: string, email: string){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  deleteToken(){
    localStorage.removeItem('token')
  }

}
