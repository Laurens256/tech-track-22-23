import { Injectable } from '@angular/core';

@Injectable()
export class EnergyService {
  constructor() { }

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

  energy: string = '<svg class="energy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 460"><path xmlns="http://www.w3.org/2000/svg" d="M 157,25 91,221 164,221 88,425 290,185 218,185 312,25z" style="stroke-width:10px;stroke:black;stroke-linejoin:round;fill:var(--energy-fill);"> <animateTransform attributeName="transform" type="rotate" calcMode="linear" repeatCount="indefinite" dur="2s" values="0; 0; 0; 5; 10; 15; 5; 15; 10; 5; 0; -5; -10; -15; -5; -15; -10; -5; 0; 0; 0;" keyTimes="0; 0.05; 0.1; 0.15; 0.2; 0.25; 0.3; 0.35; 0.4; 0.45; 0.5; 0.55; 0.6; 0.65; 0.7; 0.75; 0.8; 0.85; 0.9; 0.95; 1;"/></path></svg>';

}
