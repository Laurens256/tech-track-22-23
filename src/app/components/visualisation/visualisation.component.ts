import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';
import { VisualisationService } from 'src/app/core/services/generateVis.service';

import * as d3 from 'd3';
let svg: SVGElement;
let energyGroup: any;

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(
    private visualisationSvc: VisualisationService
  ) { }


  @Input() data!: {
    averages: Averages
    highlights: Highlights
  };
  @Input() isOpen!: boolean;
  @Input() hasVisData: boolean = false;

  first: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpen) {
      if (this.first) {
        this.first = !this.first;
        // speel animatie dingetje af
      }

      if(this.hasVisData) {
        const energy = this.visualisationSvc.genEnergy(this.data.averages.energy);
        energyGroup.insertAdjacentHTML('beforeend', energy)
      }
    }
  }

  ngOnInit(): void {
    // console.log(this.svg);
    window.addEventListener("scroll", () => {
      // console.log(scrollY);
      if(scrollY > 240 && scrollY < 280 && this.isOpen) {
        document.querySelector('.back')?.classList.add('hidden');
      } else {
        document.querySelector('.back')?.classList.remove('hidden');
      }
  });
  }

  ngAfterViewInit(): void {
    svg = document.querySelector('#visualisation')!;
    energyGroup = document.querySelector('#energygroup')!;
  }

  valenceGen() {

  }

}
