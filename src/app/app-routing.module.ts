import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserPlaylistsComponent } from './components/user-playlists/user-playlists.component';
import { AuthorizingComponent } from './components/authorizing/authorizing.component';

import { AuthGuard } from './core/services/spotifyAuth/auth.guard';

const routes: Routes = [
  //login
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'home', component: UserPlaylistsComponent },
  { path: 'authorizing', component: AuthorizingComponent, canActivate: [AuthGuard] },

  // { path: '', redirectTo: '', pathMatch: 'full' },
  //404 pagina of iets dergelijks kan hier in de plaats worden gezet
  // { path: '**', redirectTo: 'data' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  HomeComponent,
  AuthorizingComponent
];
