import { Injectable } from '@angular/core';

@Injectable()
export class AcousticNessService {
  constructor() { }


  genAcousticness(acousticness: number) {
    return '<svg class="acoustic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50"> <style>.g1 {animation: bounce1 1500ms linear infinite normal forwards}@keyframes bounce1 { 0% {transform: translate(90px,44.810621px);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 20% {transform: translate(90px,34.810621px);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 46.666667% {transform: translate(90px,32.810621px)} 100% {transform: translate(90px,32.810621px)}} .g2 {animation: bounce2 1500ms linear infinite normal forwards}@keyframes bounce2 { 0% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 20% {transform: scale(1.1,1.1);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 46.666667% {transform: scale(1.2,1.2)} 100% {transform: scale(1.2,1.2)}}</style> <g class="g1" transform="translate(90,44.810621)"><g class="g2" transform="scale(1,1)"><path d="M77.326069,150c36.589596-32.284107,109.247383-31.444601,145.347862,0" transform="translate(-150,-150)" fill="none" stroke="var(--energy-fill)" stroke-width="5" stroke-linecap="round"/></g></g></svg>';
    // let svg: string = this.acousticness.default;
    // const position = svg.indexOf('|');

    // switch (true) {
    //   case (acousticness > 0 && acousticness <= 33):
    //     return [svg.slice(0, position), this.acousticness.low, svg.slice(position + 1)].join('');
    //   case (acousticness <= 66):
    //     return [svg.slice(0, position), this.acousticness.mid, svg.slice(position + 1)].join('');
    //   case (acousticness <= 100):
    //     return [svg.slice(0, position), this.acousticness.high, svg.slice(position + 1)].join('');
    //   default:
    //     return '';
    // }
  }

  // acousticness = {
  //   low: 'low',
  //   mid: 'mid',
  //   high: 'high',
  //   default: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50"><style>.g1 {animation: bounce1 1500ms linear infinite normal forwards}@keyframes bounce1 { 0% {transform: translate(90px,44.810621px);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 20% {transform: translate(90px,34.810621px);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 46.666667% {transform: translate(90px,32.810621px)} 100% {transform: translate(90px,32.810621px)}} .g2 {animation: bounce2 1500ms linear infinite normal forwards}@keyframes bounce2 { 0% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 20% {transform: scale(1.1,1.1);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 46.666667% {transform: scale(1.2,1.2)} 100% {transform: scale(1.2,1.2)}}</style>|</svg>'
  // }
  // gemaakt in https://app.svgator.com
}
