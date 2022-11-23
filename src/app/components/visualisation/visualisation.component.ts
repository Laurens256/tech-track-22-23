import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';
import { VisualisationService } from 'src/app/core/services/generateVis.service';

import * as d3 from 'd3';
let energyContainers: NodeListOf<HTMLDivElement>;
let acousticnessContainer: NodeListOf<HTMLDivElement>;

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
        console.log(this.data);
        const people = this.visualisationSvc.genPeople(this.data.averages.valence, this.data.averages.danceability);

        const energy = this.visualisationSvc.genEnergy(this.data.averages.energy);
        const acousticness = this.visualisationSvc.genAcousticness(this.data.averages.acousticness);
        // const instrumentalness = this.visualisationSvc.genInstrumentalness(this.data.averages.instrumentalness);


        energyContainers.forEach((container: HTMLDivElement) => {
          container.innerHTML = energy;
        })

        acousticnessContainer.forEach((container: HTMLDivElement) => {
          container.innerHTML = acousticness;
        })

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
    energyContainers = document.querySelectorAll('.energycontainer')!;
    acousticnessContainer = document.querySelectorAll('.acousticnesscontainer')!;
  }

}
