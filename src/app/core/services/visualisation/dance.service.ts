import { Injectable } from '@angular/core';

@Injectable()
export class DanceService {
  constructor() { }

  genDanceability(danceability: number) {
    let danceabilityObj = {
      low: '',
      mid: '',
      high: ''
    };

    danceabilityObj.low = this.danceability.low;

    //meerdere losse if statements zodat er minder code wordt herhaald ,geloof me dit is beter:(
    if (danceability >= 33) {
      danceabilityObj.mid = this.danceability.mid;
    }

    if (danceability >= 66) {
      danceabilityObj.high = this.danceability.high;
    }

    return danceabilityObj;
  }

  danceability = {
    low: '',
    mid: '',
    high: '<img src="/assets/img/visualisation/katje.gif" alt="dancing cat">',
  }
}
