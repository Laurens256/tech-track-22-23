import { Injectable } from '@angular/core';

@Injectable()
export class EnergyService {
  constructor() { }

  genEnergy(energy: number) {
    let energySvg = {
      left: '',
      right: ''
    }
    switch (true) {
      case (energy > 0 && energy <= 33):
        energySvg.left = this.energy.left.low;
        energySvg.right = this.energy.right.low;
      case (energy <= 66):
        energySvg.left = energySvg.left + this.energy.left.mid;
        energySvg.right = energySvg.right + this.energy.right.mid;
      case (energy <= 100):
        energySvg.left = energySvg.left + this.energy.left.high;
        energySvg.right = energySvg.right + this.energy.right.high;
        break;
      default:
        energySvg.left = '';
        energySvg.right = '';
    }
    return energySvg;
  }

  energy = {
    left: {
      low: '<path d="M189.26,74.05l10.38,30.82h-11.48s11.95,32.08,11.95,32.08l-31.76-37.74h11.32s-14.78-25.16-14.78-25.16h24.37Z"/>',
      mid: '<path d="M69.26,144.05l10.38,30.82h-11.48s11.95,32.08,11.95,32.08l-31.76-37.74h11.32s-14.78-25.16-14.78-25.16h24.37Z"/>',
      high: '<path d="M129.26,104.05l10.38,30.82h-11.48s11.95,32.08,11.95,32.08l-31.76-37.74h11.32s-14.78-25.16-14.78-25.16h24.37Z"/>',
    },
    right: {
      low: '<path d="M263.74,74.05l-10.38,30.82h11.48s-11.95,32.08-11.95,32.08l31.76-37.74h-11.32s14.78-25.16,14.78-25.16h-24.37Z"/>',
      mid: '<path d="M383.74,144.05l-10.38,30.82h11.48s-11.95,32.08-11.95,32.08l31.76-37.74h-11.32s14.78-25.16,14.78-25.16h-24.37Z"/>',
      high: '<path d="M323.74,104.05l-10.38,30.82h11.48s-11.95,32.08-11.95,32.08l31.76-37.74h-11.32s14.78-25.16,14.78-25.16h-24.37Z"/>',
    }
  }
}
