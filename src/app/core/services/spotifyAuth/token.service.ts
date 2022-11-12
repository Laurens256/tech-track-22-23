import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TokenService {

  constructor() {}

  private token = '';

  public get getAccessToken(): string {
    return this.token;
  }

  public clearToken(): void {
    this.token = '';
  }

  public get getAuthHeader(): {[Authorization: string]: string} {
    if(this.token) {
        return { Authorization: `Bearer ${this.token}` };
      } else {
        return {};
      }
  }

  public setAccessToken(access_token: string): boolean {
    if (!!access_token) {
      this.token = access_token;
    } else {
      this.token = '';
    }
    return !!this.token;
  }

}
