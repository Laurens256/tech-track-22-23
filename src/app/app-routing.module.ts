import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserPlaylistsComponent } from './components/user-playlists/user-playlists.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AuthorizingComponent } from './components/authorizing/authorizing.component';
import { VisualisationComponent } from './components/visualisation/visualisation.component';

import { AuthGuard } from './core/services/spotifyAuth/auth.guard';

const routes: Routes = [
  //login
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'home', component: UserPlaylistsComponent },
  { path: 'playlist', component: PlaylistComponent },
  // { path: 'playlist/:', component: PlaylistComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //404 pagina of iets dergelijks kan hier in de plaats worden gezet
  // { path: '**', redirectTo: 'data' },

  { path: 'authorizing', component: AuthorizingComponent, canActivate: [AuthGuard] },
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
  AuthorizingComponent,
  UserPlaylistsComponent,
  PlaylistComponent,
  VisualisationComponent
];
