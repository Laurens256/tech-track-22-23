import { Injectable } from '@angular/core';

@Injectable()
export class AcousticNessService {
  constructor() { }


  genAcousticness(acousticness: number) {
    let wavesSvg = {
      topleft: '',
      topright: '',
      bottomright: '',
      bottomleft: ''
    }
    let speakerSvg = {
      left: '',
      right: '',
    }

    wavesSvg.topleft = this.acousticWaves.topleft.low;
    wavesSvg.topright = this.acousticWaves.topright.low;
    wavesSvg.bottomright = this.acousticWaves.bottomright.low;
    wavesSvg.bottomleft = this.acousticWaves.bottomleft.low;
    document.documentElement.style.setProperty('--acousticbounce', '1.3');

    speakerSvg.left = speakerSvg.left + this.acousticSpeakers.left.low;
    speakerSvg.right = speakerSvg.right + this.acousticSpeakers.right.low;

    if (acousticness >= 33) {
      wavesSvg.topleft = wavesSvg.topleft + this.acousticWaves.topleft.mid;
      wavesSvg.topright = wavesSvg.topright + this.acousticWaves.topright.mid;
      wavesSvg.bottomright = wavesSvg.bottomright + this.acousticWaves.bottomright.mid;
      wavesSvg.bottomleft = wavesSvg.bottomleft + this.acousticWaves.bottomleft.mid;
      document.documentElement.style.setProperty('--acousticbounce', '1.5');
      // document.documentElement.style.setProperty('--soundwaves', 'var(--barmid)');

      speakerSvg.left = speakerSvg.left + this.acousticSpeakers.left.mid;
      speakerSvg.right = speakerSvg.right + this.acousticSpeakers.right.mid;
    }
    if (acousticness >= 66) {
      wavesSvg.topleft = wavesSvg.topleft + this.acousticWaves.topleft.high;
      wavesSvg.topright = wavesSvg.topright + this.acousticWaves.topright.high;
      wavesSvg.bottomright = wavesSvg.bottomright + this.acousticWaves.bottomright.high;
      wavesSvg.bottomleft = wavesSvg.bottomleft + this.acousticWaves.bottomleft.high;
      document.documentElement.style.setProperty('--acousticbounce', '2');
      // document.documentElement.style.setProperty('--soundwaves', 'var(--barhigh)');

      speakerSvg.left = speakerSvg.left + this.acousticSpeakers.left.high;
      speakerSvg.right = speakerSvg.right + this.acousticSpeakers.right.high;
    }
    return { soundWaves: wavesSvg, speakers: speakerSvg };
  }

  acousticWaves = {
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

  acousticSpeakers = {
    left: {
      low: '<path style="fill:var(--speaker-left);" d="M103.29,206l-20.9,-10.3l0,32l20.9,10.6l0,-32.3z" /> <path style="fill:var(--speaker-right);" d="M103.29,206l0,32.3l21.3,-10.7l0,-32l-21.3,10.4z" /> <path style="fill:var(--speaker-top);" d="M82.39,195.7l20.9,10.3l21.3,-10.4l-21.3,-10.4l-20.9,10.5z" /> <path style="stroke:var(--speaker-right);fill:var(--speaker-handle);" d="M95.39,218.2l-5.8,-3.2l0,-5.3l5.8,3.1l0,5.4z" /> <g class="speakercircle"> <path d="M114.09,217.3c-.6,.3-2.1,1.2-3,3-.8,1.5-.8,2.9-.8,3.5,0,.1,0,1.4,1.1,2.2,.8,.5,1.8,.6,2.7,.1,.6-.3,1.8-1.1,2.7-2.6,1.1-1.7,1.2-3.4,1.2-4.1,0-.4-.1-1.1-.6-1.6-.8-.7-2.1-1-3.3-.5Z" /> <path d="M114.09,213.5c-1.1,.5-3.9,2.2-5.7,5.7-1.4,2.8-1.5,5.3-1.4,6.5,0,.2,0,2.6,2.1,4,1.5,1,3.4,1,5,.1,1.1-.6,3.3-2.1,5-4.8,2-3.2,2.1-6.2,2.1-7.5,0-.7-.2-2-1.1-3-1.4-1.4-3.8-1.9-6-1Z" /> <path d="M114.19,204.1c-.5,.2-1.7,1-2.5,2.5-.6,1.2-.6,2.3-.6,2.9,0,.1,0,1.2,.9,1.8,.6,.4,1.5,.4,2.2,0,.5-.3,1.4-.9,2.2-2.1,.9-1.4,.9-2.7,.9-3.3,0-.3-.1-.9-.5-1.3-.6-.7-1.6-.9-2.6-.5Z" /> <path d="M114.19,206.9c-.1,.1-.4,.2-.5,.5s-.1,.5-.1,.6c0,0,0,.2,.2,.4,.1,.1,.3,.1,.5,0,.1-.1,.3-.2,.5-.4,.2-.3,.2-.6,.2-.7s0-.2-.1-.3c-.2-.1-.5-.2-.7-.1Z"/></g>',
      mid: '<path style="fill:var(--speaker-right);" d="M124.69,195l0,32.3l21.3,-10.7l0,-32l-21.3,10.4z" /> <path style="fill:var(--speaker-top);" d="M103.79,184.7l20.9,10.3l21.3,-10.4l-21.3,-10.4l-20.9,10.5z" /><g class="speakercircle"> <path d="M135.09,206.3c-.6,.3-2.1,1.2-3,3-.8,1.5-.8,2.9-.8,3.5,0,.1,0,1.4,1.1,2.2,.8,.5,1.8,.6,2.7,.1,.6-.3,1.8-1.1,2.7-2.6,1.1-1.7,1.2-3.4,1.2-4.1,0-.4-.1-1.1-.6-1.6-.8-.7-2.1-1-3.3-.5Z" /> <path d="M135.09,202.5c-1.1,.5-3.9,2.2-5.7,5.7-1.4,2.8-1.5,5.3-1.4,6.5,0,.2,0,2.6,2.1,4,1.5,1,3.4,1,5,.1,1.1-.6,3.3-2.1,5-4.8,2-3.2,2.1-6.2,2.1-7.5,0-.7-.2-2-1.1-3-1.4-1.4-3.8-1.9-6-1Z" /> <path d="M135.19,193.1c-.5,.2-1.7,1-2.5,2.5-.6,1.2-.6,2.3-.6,2.9,0,.1,0,1.2,.9,1.8,.6,.4,1.5,.4,2.2,0,.5-.3,1.4-.9,2.2-2.1,.9-1.4,.9-2.7,.9-3.3,0-.3-.1-.9-.5-1.3-.6-.7-1.6-.9-2.6-.5Z" /> <path d="M135.19,195.9c-.1,.1-.4,.2-.5,.5s-.1,.5-.1,.6c0,0,0,.2,.2,.4,.1,.1,.3,.1,.5,0,.1-.1,.3-.2,.5-.4,.2-.3,.2-.6,.2-.7s0-.2-.1-.3c-.2-.1-.5-.2-.7-.1Z" /> </g>',
      high: '<path style="fill:var(--speaker-right);" d="M146.09,184l0,32.3l21.3,-10.7l0,-32l-21.3,10.4z" /> <path style="fill:var(--speaker-top);" d="M125.19,173.7l20.9,10.3l21.3,-10.4l-21.3,-10.4l-20.9,10.5z" /> <g class="speakercircle"> <path d="M156.89,195.3c-.6,.3-2.1,1.2-3,3-.8,1.5-.8,2.9-.8,3.5,0,.1,0,1.4,1.1,2.2,.8,.5,1.8,.6,2.7,.1,.6-.3,1.8-1.1,2.7-2.6,1.1-1.7,1.2-3.4,1.2-4.1,0-.4-.1-1.1-.6-1.6-.8-.7-2.1-1-3.3-.5Z" /> <path d="M156.89,191.5c-1.1,.5-3.9,2.2-5.7,5.7-1.4,2.8-1.5,5.3-1.4,6.5,0,.2,0,2.6,2.1,4,1.5,1,3.4,1,5,.1,1.1-.6,3.3-2.1,5-4.8,2-3.2,2.1-6.2,2.1-7.5,0-.7-.2-2-1.1-3-1.4-1.4-3.8-1.9-6-1Z" /> <path d="M156.99,182.1c-.5,.2-1.7,1-2.5,2.5-.6,1.2-.6,2.3-.6,2.9,0,.1,0,1.2,.9,1.8,.6,.4,1.5,.4,2.2,0,.5-.3,1.4-.9,2.2-2.1,.9-1.4,.9-2.7,.9-3.3,0-.3-.1-.9-.5-1.3-.6-.7-1.6-.9-2.6-.5Z" /> <path d="M156.99,184.9c-.1,.1-.4,.2-.5,.5s-.1,.5-.1,.6c0,0,0,.2,.2,.4,.1,.1,.3,.1,.5,0,.1-.1,.3-.2,.5-.4,.2-.3,.2-.6,.2-.7s0-.2-.1-.3c-.2-.1-.5-.2-.7-.1Z" /> </g>'
    },
    right: {
      low: '',
      mid: '',
      high: ''
    }
  }
}
