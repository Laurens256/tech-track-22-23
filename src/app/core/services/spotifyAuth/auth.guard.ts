import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';

// import { AuthService } from './auth.service';
// import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  // constructor(private authService: AuthService, private tokenSvc: TokenService) { }

  public canActivate(url: ActivatedRouteSnapshot): boolean {
    console.log(url.queryParams);
    return this.canActivateChild(url);
  }

  public canActivateChild(url: ActivatedRouteSnapshot): boolean {
    const access_token: string = url.queryParams['access_token'];
    if (access_token) {
      // this.tokenSvc.setAuthToken(response);
    }
    return !!access_token;
  }
}
