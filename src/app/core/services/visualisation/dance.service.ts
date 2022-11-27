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
    mid: '<img src="/assets/img/visualisation/dance_mid.gif" alt="dancing cat">',
    high: '<img src="/assets/img/visualisation/dance_high.gif" alt="enthousiastic dancing cat">',
  }
  bronnen = {
    low: '',
    mid: ['https://twitter.com/USBFIG/status/1115050915059335169', 'https://knowyourmeme.com/memes/dancing-cat-gif'],
    high: 'https://giphy.com/gifs/cat-dance-furry-BK1EfIsdkKZMY',
  }
}
