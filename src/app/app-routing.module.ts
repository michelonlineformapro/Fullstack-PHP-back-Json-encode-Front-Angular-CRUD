import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {RegistrationComponent} from "./registration/registration.component";
import {UsersComponent} from "./users/users.component";
import {GamesComponent} from "./games/games.component";

const routes: Routes = [
  {
    path: '', pathMatch:'full', redirectTo:'connexion'
  },
  {
    //Ici on ajoute auth.guard.ts qui appel auth.service ets ses 3 methodes
    path: 'administration', component:AdminComponent, canActivate: [AuthGuard]
  },
  {
    path: 'connexion', component: LoginComponent
  },
  {
    path: 'inscription', component: RegistrationComponent
  },
  {
    path: 'membres', component: UsersComponent, canActivate: [AuthGuard]
  },
  {
    path: "jeux_video", component: GamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
