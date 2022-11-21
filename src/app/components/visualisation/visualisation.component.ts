import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';
import { VisualisationService } from 'src/app/core/services/generateVis.service';

import * as d3 from 'd3';
let svg: SVGElement;

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
        const test = this.visualisationSvc.genEnergy(this.data.averages.energy);
        svg.insertAdjacentHTML('beforeend', test)
      }
    }
  }

  ngOnInit(): void {
    // console.log(this.svg);
  }

  ngAfterViewInit(): void {
    svg = document.querySelector('#visualisation')!;
  }

  valenceGen() {

  }

}
