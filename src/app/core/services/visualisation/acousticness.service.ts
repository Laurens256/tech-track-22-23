import { Injectable } from '@angular/core';

@Injectable()
export class AcousticNessService {
  constructor() { }


  genAcousticness(acousticness: number) {
    let acousticSvg = {
      topleft: '',
      topright: '',
      bottomright: '',
      bottomleft: ''
    }
    switch (true) {
      case (acousticness > 0 && acousticness <= 33):
        acousticSvg.topleft = acousticSvg + this.acoustic.topleft.low;
        acousticSvg.topright = acousticSvg + this.acoustic.topright.low;
        acousticSvg.bottomright = acousticSvg + this.acoustic.bottomright.low;
        acousticSvg.bottomleft = acousticSvg + this.acoustic.bottomleft.low;
      case (acousticness <= 66):
        acousticSvg.topleft = acousticSvg + this.acoustic.topleft.mid;
        acousticSvg.topright = acousticSvg + this.acoustic.topright.mid;
        acousticSvg.bottomright = acousticSvg + this.acoustic.bottomright.mid;
        acousticSvg.bottomleft = acousticSvg + this.acoustic.bottomleft.mid;
      case (acousticness <= 100):
        acousticSvg.topleft = acousticSvg + this.acoustic.topleft.high;
        acousticSvg.topright = acousticSvg + this.acoustic.topright.high;
        acousticSvg.bottomright = acousticSvg + this.acoustic.bottomright.high;
        acousticSvg.bottomleft = acousticSvg + this.acoustic.bottomleft.high;
        break;
      default:
        acousticSvg.topleft = '';
        acousticSvg.topright = '';
        acousticSvg.topright = '';
        acousticSvg.topright = '';
    }
    return acousticSvg;
  }

  acoustic = {
    topleft: {
      low: '',
      mid: '',
      high: '',
    },
    topright: {
      low: '<path d="M328.61,40.26c12.11-3.2,28.67,5.36,33.34,16.72"/>',
      mid: '<path d="M333.61,35.26c12.11-3.2,28.67,5.36,33.34,16.72"/>',
      high: '<path d="M338.61,30.26c12.11-3.2,28.67,5.36,33.34,16.72"/>',
    },
    bottomright: {
      low: '',
      mid: '',
      high: '',
    },
    bottomleft: {
      low: '',
      mid: '',
      high: '',
    }
  }
}
