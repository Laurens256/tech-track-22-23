import { Injectable } from '@angular/core';


@Injectable()
export class VisualisationService {
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
    const position = danceabilityStr.indexOf('|');
    const people = [danceabilityStr.slice(0, position), valenceStr, danceabilityStr.slice(position + 1)].join('');
    console.log(people);
  }

  genEnergy(energy: number): string {
    switch (true) {
      case (energy > 0 && energy <= 33):
        return `${this.energy}`;
      case (energy <= 66):
        return `${this.energy}${this.energy}`;
      case (energy <= 100):
        return `${this.energy}${this.energy}${this.energy}`;
      default:
        return ``;
    }
  }

  genAcousticness(acousticness: number) {
    return '<svg class="acoustic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50"> <style>.g1 {animation: bounce1 1500ms linear infinite normal forwards}@keyframes bounce1 { 0% {transform: translate(90px,44.810621px);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 20% {transform: translate(90px,34.810621px);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 46.666667% {transform: translate(90px,32.810621px)} 100% {transform: translate(90px,32.810621px)}} .g2 {animation: bounce2 1500ms linear infinite normal forwards}@keyframes bounce2 { 0% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 20% {transform: scale(1.1,1.1);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 46.666667% {transform: scale(1.2,1.2)} 100% {transform: scale(1.2,1.2)}}</style> <g class="g1" transform="translate(90,44.810621)"><g class="g2" transform="scale(1,1)"><path d="M77.326069,150c36.589596-32.284107,109.247383-31.444601,145.347862,0" transform="translate(-150,-150)" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/></g></g></svg>';
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

  genInstrumentalness(instrumentalness: number) {

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

  energy: string = '<svg class="energy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 460"><path xmlns="http://www.w3.org/2000/svg" d="M 157,25 91,221 164,221 88,425 290,185 218,185 312,25z" style="stroke-width:10px;stroke:black;stroke-linejoin:round;fill:var(--energy-fill);"> <animateTransform attributeName="transform" type="rotate" calcMode="linear" repeatCount="indefinite" dur="2s" values="0; 0; 0; 5; 10; 15; 5; 15; 10; 5; 0; -5; -10; -15; -5; -15; -10; -5; 0; 0; 0;" keyTimes="0; 0.05; 0.1; 0.15; 0.2; 0.25; 0.3; 0.35; 0.4; 0.45; 0.5; 0.55; 0.6; 0.65; 0.7; 0.75; 0.8; 0.85; 0.9; 0.95; 1;"/></path></svg>';

  // acousticness = {
  //   low: 'low',
  //   mid: 'mid',
  //   high: 'high',
  //   default: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50"><style>.g1 {animation: bounce1 1500ms linear infinite normal forwards}@keyframes bounce1 { 0% {transform: translate(90px,44.810621px);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 20% {transform: translate(90px,34.810621px);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 46.666667% {transform: translate(90px,32.810621px)} 100% {transform: translate(90px,32.810621px)}} .g2 {animation: bounce2 1500ms linear infinite normal forwards}@keyframes bounce2 { 0% {transform: scale(1,1);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 20% {transform: scale(1.1,1.1);animation-timing-function: cubic-bezier(0.175,0.885,0.32,1.275)} 46.666667% {transform: scale(1.2,1.2)} 100% {transform: scale(1.2,1.2)}}</style>|</svg>'
  // }
  // gemaakt in https://app.svgator.com
}
