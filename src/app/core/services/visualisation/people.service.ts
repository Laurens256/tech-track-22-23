import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {
  constructor() { }

  genPeople(valence: number, danceability: number) {
    let valenceStr: string = '';
    let danceabilityStr: string = '';
    switch (true) {
      case (valence > 0 && valence <= 33):
        valenceStr = this.valence.low;
        break;
      case (valence <= 66):
        valenceStr = this.valence.mid;
        break;
      case (valence <= 100):
        valenceStr = this.valence.high;
        break;
      default:
        valenceStr = this.valence.default;
        break;
    }

    switch (true) {
      case (danceability > 0 && danceability <= 33):
        danceabilityStr = this.danceability.low;
        break;
      case (danceability <= 66):
        danceabilityStr = this.danceability.mid;
        break;
      case (danceability <= 100):
        danceabilityStr = this.danceability.high;
        break;
      default:
        danceabilityStr = this.danceability.default;
        break;
    }

    //voegt het gezicht op de juiste plek toe binnen de svg
    const people = danceabilityStr.replace('|', valenceStr)
    console.log(people);
  }

  valence = {
    low: 'v1',
    mid: 'v2',
    high: 'v3',
    default: 'v4'
  }

  danceability = {
    low: 'd1|d1',
    mid: 'd2|d2',
    high: 'd3|d3',
    default: 'd4|d4'
  }
}
