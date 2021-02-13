import { Component, OnInit } from '@angular/core';
//Appel du model
import {User} from "../user";
//Appel du service
import {UsersService} from "../users.service";
//Notification


/**
 * La combinaison des Promises avec Async / Await est intéressante mais ne répond pas encore à tous les "use cases".
 Pour outrepasser les limites des "promises" pour les traitements asynchrones, Angular se base principalement sur le concept d'Observables ou plus généralement le Reactive Programming.
 En attendant la standardisation des Observables, Angular utilise la librairie RxJS.
 */

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //Tableau de valeur user vide
  userData: any = []
  //Rappel du model
  public userModel: User = {
    id: null,
    email:null,
    password: null
  }

  //Init des import
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    //Appel de la methode lecture des utilisateur
    this.readAllUsers()
  }

  //Methode de lecture des utilisateur et appel du services pour liaison avec crud php
  //Void est une fonction neutre
  readAllUsers(): void{
    //appel de la methode du service (liaison avec php)
    this.usersService.getAllUsersService().subscribe(
      //subscribe = Produit un "stream" de valeurs (potentiellement infini).
      //Appel du tableau json User assigné a une variable
      (users: User[]) => {
        //Le tableau vide usersData = a la variable users = User[]
        this.userData = users
        //Debug console
        console.log((this.userData))
      })
  }

  //De manière asyncrone (AJAX) on va gerer le crud
  //Soit on met a jour soit on creer un nouveau utilisateur
  //On passe en paramètres form qui est = a <form  #f = "ngForm"> dans user.component.html
  createOrUpdate(form){
    //pour la mise a jour on fait appel a un id dans le modele
    //pour acceder au valeur du model on init et on accède au element userModel.email (id ou password)
    if(this.userModel && this.userModel.id){
      //Passque du paramètre du formulaire qui est egale a la valeur du json
      form.value.id = this.userModel.id
      //Appel de la methode update du service
      this.usersService.updateUsersService(form.value).subscribe(
        //creation du variable pour le model
        (user: User) => {
          console.log("Utilisateur mis à jour", user)

        })
    }else{
      //Si on a pas id on creer un nouveau utilisateur
      //Appel de la methode du service de creation d'un utilisateur
      this.usersService.createUsersService(form.value).subscribe(
        //Creation d'une variable et assignation au model
        (user: User) => {
          //Appel de la methode de lecture de tous les utilisateurs
          this.readAllUsers()
          console.log("Utilisateur ajouté avec succès", user)
        })
    }
  }

  //Detail d'un utilisateur
  getOneUser(user: User){
    this.userModel = user
  }

  //Supprimer un utilisateur
  deleteOneUser(id:number){
    //Appel de la methode du service qui prend un paramètre int de id: number du model
    this.usersService.deleteUsersService(id).subscribe(
      (user: User) => {
        this.readAllUsers()
        console.log("Utilisateur supprimer avec succès", user)
      }
    )
  }

}
