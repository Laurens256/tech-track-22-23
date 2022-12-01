import { Injectable } from '@angular/core';

@Injectable()
export class EnergyService {
  constructor() { }

  genLights(energy: number) {
    let lights: string = '';

    lights += this.energy.low;
    if (energy >= 33) {
      lights += this.energy.mid;
    }
    if (energy >= 66) {
      lights += this.energy.high;
    }

    return lights;
  }

  energy = {
      low: '<div class="lightleftcontainer"><div class="lightleft"></div></div>',
      mid: '<div class="lightrightcontainer"><div class="lightright"></div></div>',
      high: '<div class="lightmiddlecontainer"><div class="lightmiddle"></div></div>',
  }
}
