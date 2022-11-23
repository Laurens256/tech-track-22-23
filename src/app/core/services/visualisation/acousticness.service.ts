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

    acousticSvg.topleft = this.acoustic.topleft.low;
    acousticSvg.topright = this.acoustic.topright.low;
    acousticSvg.bottomright = this.acoustic.bottomright.low;
    acousticSvg.bottomleft = this.acoustic.bottomleft.low;
    document.documentElement.style.setProperty('--acousticbounce', '1.2');

    if (acousticness >= 33) {
      acousticSvg.topleft = acousticSvg.topleft + this.acoustic.topleft.mid;
      acousticSvg.topright = acousticSvg.topright + this.acoustic.topright.mid;
      acousticSvg.bottomright = acousticSvg.bottomright + this.acoustic.bottomright.mid;
      acousticSvg.bottomleft = acousticSvg.bottomleft + this.acoustic.bottomleft.mid;
      document.documentElement.style.setProperty('--acousticbounce', '1.5');
    }
    if (acousticness >= 66) {
      acousticSvg.topleft = acousticSvg.topleft + this.acoustic.topleft.high;
      acousticSvg.topright = acousticSvg.topright + this.acoustic.topright.high;
      acousticSvg.bottomright = acousticSvg.bottomright + this.acoustic.bottomright.high;
      acousticSvg.bottomleft = acousticSvg.bottomleft + this.acoustic.bottomleft.high;
      document.documentElement.style.setProperty('--acousticbounce', '2');
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
