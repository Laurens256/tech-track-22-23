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
    document.documentElement.style.setProperty('--acousticbounce', '1.3');

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
      low: '<path d="M116.33,42.43c-12.11-3.2-28.67,5.36-33.34,16.72"/>',
      mid: '<path d="M111.33,37.43c-12.11-3.2-28.67,5.36-33.34,16.72"/>',
      high: '<path d="M106.33,32.43c-12.11-3.2-28.67,5.36-33.34,16.72"/>',
    },
    topright: {
      low: '<path d="M326.61,42.21c12.11-3.2,28.67,5.36,33.34,16.72"/>',
      mid: '<path d="M331.61,37.21c12.11-3.2,28.67,5.36,33.34,16.72"/>',
      high: '<path d="M336.61,32.26c12.11-3.2,28.67,5.36,33.34,16.72"/>',
    },
    bottomright: {
      low: '<path d="M326.61,344.17c12.11,3.2,28.67-5.36,33.34-16.72"/>',
      mid: '<path d="M331.61,349.17c12.11,3.2,28.67-5.36,33.34-16.72"/>',
      high: '<path d="M336.61,354.17c12.11,3.2,28.67-5.36,33.34-16.72"/>',
    },
    bottomleft: {
      low: '<path d="M116.33,344.17c-12.11,3.2-28.67-5.36-33.34-16.72"/>',
      mid: '<path d="M111.33,349.17c-12.11,3.2-28.67-5.36-33.34-16.72"/>',
      high: '<path d="M106.33,354.17c-12.11,3.2-28.67-5.36-33.34-16.72"/>',
    }
  }
}
