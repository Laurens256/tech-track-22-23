import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';

import * as d3 from 'd3';
let svg: SVGElement;

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit, OnChanges, AfterViewInit {

  constructor() { }


  @Input() data!: {
    averages: Averages
    highlights: Highlights
  };
  @Input() isOpen!: boolean;
  first: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpen) {
      if (this.first) {
        this.first = !this.first;
        // speel animatie dingetje af
      }

      // d3 zooi
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
