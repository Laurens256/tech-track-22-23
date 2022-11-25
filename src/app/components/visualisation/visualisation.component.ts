import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';
import { DanceService, EnergyService, AcousticNessService } from 'src/app/core/services/visualisation';

let svg: SVGElement;
let energyGroups: NodeListOf<SVGElement>;
let acousticGroups: NodeListOf<SVGElement>;
let danceContainers: NodeListOf<HTMLDivElement>;

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VisualisationComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(
    private danceSvc: DanceService,
    private energySvc: EnergyService,
    private acousticnessSvc: AcousticNessService
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

      if (this.hasVisData) {
        console.log(this.data);
        const dance = this.danceSvc.genDanceability(this.data.averages.danceability);
        const energy = this.energySvc.genEnergy(this.data.averages.energy);
        const acousticness = this.acousticnessSvc.genAcousticness(this.data.averages.acousticness);
        // const instrumentalness = this.visualisationSvc.genInstrumentalness(this.data.averages.instrumentalness);

        type danceKey = keyof typeof dance;
        type energyKey = keyof typeof energy;
        type acousticKey = keyof typeof acousticness;

        danceContainers.forEach(container => {
          container.innerHTML = dance[container.classList[1] as danceKey];
        })

        energyGroups.forEach(group => {
          group.innerHTML = energy[group.classList[1] as energyKey];
        })

        acousticGroups.forEach(group => {
          group.innerHTML = acousticness[group.classList[1] as acousticKey];
        })

      }
    }
  }

  ngOnInit(): void {
    // console.log(this.svg);
    window.addEventListener("scroll", () => {
      // console.log(scrollY);
      if (scrollY > 240 && scrollY < 280 && this.isOpen) {
        document.querySelector('.back')?.classList.add('hidden');
      } else {
        document.querySelector('.back')?.classList.remove('hidden');
      }
    });
  }

  ngAfterViewInit(): void {
    svg = document.querySelector('svg')!;
    danceContainers = document.querySelectorAll('.dancecontainer')!;
    energyGroups = svg.querySelectorAll('.energygroup');
    acousticGroups = svg.querySelectorAll('.acousticnessgroup');
  }

  toggleFiltersPanel() {
    const filterPanel: HTMLElement = document.querySelector('main aside')!;
    filterPanel.classList.toggle('hidden');
    // filterPanel.classList.remove('delayedzindex');
    if (!filterPanel.classList.contains('hidden')) {
      setTimeout(() => {
        filterPanel.classList.add('delayedzindex');
      }, 300);
    }

  }

  toggleFilters(element: HTMLInputElement) {
    console.log(element);
    document.querySelectorAll(`.${element.id}`)?.forEach(el => {
      el.classList.toggle('hidden');
    });
  }
}
