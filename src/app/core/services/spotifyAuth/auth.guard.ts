import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';

import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private tokenService: TokenService
    ) { }

  public canActivate(url: ActivatedRouteSnapshot): boolean {
    return this.canActivateChild(url);
  }

  public canActivateChild(url: ActivatedRouteSnapshot): boolean {
    const access_token: string = url.queryParams['access_token'];
    if (access_token) {
      this.tokenService.setAccessToken(access_token);
    }
    return !!access_token;
  }
}
