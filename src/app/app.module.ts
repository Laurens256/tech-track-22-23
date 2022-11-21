import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

//services
import { SpotifyAuthService, AuthGuard, TokenService, SpotifyAuthInterceptor }
from './core/services/spotifyAuth/index';
import { UserDataService } from './core/services/userData.service';
import { VisualisationService } from './core/services/generateVis.service';


@NgModule({
  declarations: [
    AppComponent,
    //alle routing components in 1 variabele
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SpotifyAuthService,
    AuthGuard,
    TokenService,
    UserDataService,
    VisualisationService,
    [{
      provide:  HTTP_INTERCEPTORS,
      useClass:  SpotifyAuthInterceptor,
      multi:  true
    }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
