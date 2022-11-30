import { Injectable } from '@angular/core';
import { formatNumber } from '@angular/common'

@Injectable()
export class TooltipService {
  constructor() { }

  doTooltip(e: any) {
    let data;
    const tooltip: HTMLDivElement = document.querySelector('.tooltip')!;

    // if (e.target.dataset != undefined) {
      if (e.target.dataset.tooltip != undefined) {
        data = e.target.dataset.tooltip;
      }
    // }
    // if (e.target.parentNode.dataset != undefined) {
      if (e.target.parentNode.dataset.tooltip != undefined) {
        data = e.target.parentNode.dataset.tooltip;
      // }
    }

    if (data) {
      const x = e.clientX;
      const y = e.clientY;

      const tooltipText: HTMLParagraphElement = tooltip.querySelector('p')!;

      if (tooltip && tooltipText) {
        tooltip.classList.add('visible');
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;

        tooltipText.textContent = data;
      }

    } else {
      tooltip.classList.remove('visible');
    }
  }
}
