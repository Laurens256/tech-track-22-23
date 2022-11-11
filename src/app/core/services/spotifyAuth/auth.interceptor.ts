import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class SpotifyAuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({ setHeaders: this.tokenService.getAuthHeader });
    return next.handle(modifiedReq);
  }

  //Bron: https://medium.com/angular-shots/shot-3-how-to-add-http-headers-to-every-request-in-angular-fab3d10edc26
}
