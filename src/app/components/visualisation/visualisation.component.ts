import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';
import { DanceService, EnergyService, AcousticNessService } from 'src/app/core/services/visualisation';

let svg: SVGElement;
let energyGroups: NodeListOf<SVGElement>;
let acousticWaveGroups: NodeListOf<SVGElement>;
let acousticSpeakerGroups: NodeListOf<SVGElement>;
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

        type energyKey = keyof typeof energy;

        type acousticWavesKey = keyof typeof acousticness.soundWaves;
        type acousticSpeakersKey = keyof typeof acousticness.speakers;

        for (let i = 0; i < danceContainers.length; i++) {
          danceContainers[i].innerHTML = dance[i];
        }

        // energyGroups.forEach(group => {
        //   group.innerHTML = energy[group.classList[1] as energyKey];
        // })

        acousticWaveGroups.forEach(group => {
          group.innerHTML = acousticness.soundWaves[group.classList[1] as acousticWavesKey];
        })

        acousticSpeakerGroups.forEach(group => {
          group.innerHTML = acousticness.speakers[group.classList[1] as acousticSpeakersKey];
        });

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
    energyGroups = document.querySelectorAll('.energygroup');
    acousticWaveGroups = document.querySelectorAll('.acousticwavegroup');
    acousticSpeakerGroups = document.querySelectorAll('.speakergroup');
  }

  toggleFiltersPanel() {
    const filterPanel: HTMLElement = document.querySelector('main aside')!;
    filterPanel.classList.toggle('hidden');
    // filterPanel.classList.remove('delayedzindex');
    if (!filterPanel.classList.contains('hidden')) {
      setTimeout(() => {
        filterPanel.classList.add('delayedzindex');
      }, 500);
    } else {
      filterPanel.classList.remove('delayedzindex');
    }

  }

  toggleFilters(element: HTMLInputElement) {
    document.querySelectorAll(`.${element.id}`)?.forEach(el => {
      el.classList.toggle('hidden');
    });
  }
}
