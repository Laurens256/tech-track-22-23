import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TokenService {

  constructor() { }

  private token = '';

  public get getAccessToken(): string {
    // kijk of token nog niet bestaat en of deze uit local storage gehaald kan worden
    if (this.token === '') {
      const access_ttl: string = sessionStorage.getItem('access_ttl')!;
      if (!access_ttl) {
      } else {
        const tokenObj: {access_token: string, ttl: number} = JSON.parse(access_ttl);
        const now = new Date();
        if (now.getTime() < tokenObj.ttl) {
          this.token = tokenObj.access_token;
        }
      }
    }
    return this.token;
  }

  public clearToken(): void {
    this.token = '';
  }

  public get getAuthHeader(): { [Authorization: string]: string } {
    if (this.token) {
      return { Authorization: `Bearer ${this.token}` };
    } else {
      return {};
    }
  }

  public setAccessToken(access_token: string): boolean {
    if (!!access_token) {
      this.token = access_token;

      const now = new Date();
      const access_ttl = {
        access_token: access_token,
        // tijd in milliseconds voordat token expired
        ttl: now.getTime() + 3500 * 1000
      }
      sessionStorage.setItem('access_ttl', JSON.stringify(access_ttl))
    } else {
      this.token = '';
    }
    return !!this.token;
  }

}
