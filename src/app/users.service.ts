import { Injectable, EventEmitter, Output } from '@angular/core';
//Transfert Http REST
import {HttpClient} from "@angular/common/http";
//New promise = Observeble
import {Observable} from "rxjs";
//Redirection
import {Router} from "@angular/router";
//Model utilisateur
import {User} from "./user";
//map L'opérateur map permet de créer un nouvel Observable à partir de
// l'Observable d'origine en transformant simplement chacune de ses valeurs.

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  redirectUrl: string
  baseUrl: string = "http://localhost/admin_ang/adminang/php/"

  //Adrese du back PHP
  readPhpUsers = "http://localhost/admin_ang/adminang/php/readUsers.php"
  createPhpUsers = "http://localhost/admin_ang/adminang/php/createUsers.php"
  updatePhpUsers = "http://localhost/admin_ang/adminang/php/updateUsers.php"
  deletePhpUsers = "http://localhost/admin_ang/adminang/php/deleteUsers.php"

  //Envoi d'un evenement
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter()

  //Init httpClient pour appel REST (GET POST PUT-PATCH DELETE)
  constructor(private httpClient:HttpClient) { }

  //Methode readUsers appelée depuis UsersComponent.ts
  getAllUsersService(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.readPhpUsers}`)
  }

  //Creer users
  createUsersService(user: User):Observable<User>{
    return this.httpClient.post<User>(`${this.createPhpUsers}`, user)
  }

  //Mettre a jour un utilisateur
  updateUsersService(user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.updatePhpUsers}`, user)
  }

  //Supprimer un itilisateur
  deleteUsersService(id: number){
    return this.httpClient.delete<User>(`${this.deletePhpUsers}/?id=${id}`)
  }
}
