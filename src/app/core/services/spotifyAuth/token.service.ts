import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TokenService {

  constructor() {}

  private token = '';

  private token$ = new BehaviorSubject(this.token);

  public get getAccessToken(): string {
    return this.token;
  }

  public clearToken(): void {
    this.token = '';
    this.token$.next(this.token);
  }

  public get getAuthHeader(): {[Authorization: string]: string} {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  public get authTokens(): Observable<any> {
    return this.token$.asObservable();
  }

  public setAccessToken(access_token: string): boolean {
    if (!!access_token) {
      this.token = access_token;
    } else {
      this.token = '';
    }
    this.token$.next(this.token);
    return !!this.token;
  }

}
