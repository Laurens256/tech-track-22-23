import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }

  preferences = {
    autoplay: true,
  }

  setPreference(key: keyof typeof this.preferences, value: boolean) {
    this.preferences[key] = value;

    localStorage.setItem('preferences', JSON.stringify(this.preferences));
  }

  get autoplay() {
    const pref = JSON.parse(localStorage.getItem('preferences')!);
    if(pref == null) {
      return this.preferences.autoplay;
    }
    return pref.autoplay;
  }
}
