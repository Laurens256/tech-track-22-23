import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

//services
import { SpotifyAuthService, AuthGuard } from './core/services/spotifyAuth/index';
import { AuthorizingComponent } from './components/authorizing/authorizing.component';

@NgModule({
  declarations: [
    AppComponent,
    //alle routing components in 1 variabele
    routingComponents,
    AuthorizingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SpotifyAuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
