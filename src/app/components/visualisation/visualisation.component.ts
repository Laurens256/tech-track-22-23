import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';
import { DanceService, EnergyService, AcousticNessService, InstrumentalService, TooltipService } from 'src/app/core/services/visualisation';

let mainElement: HTMLElement;
let energyGroups: NodeListOf<SVGElement>;
let acousticWaveGroups: NodeListOf<SVGElement>;
let acousticSpeakerGroups: NodeListOf<SVGElement>;
let danceContainers: NodeListOf<HTMLDivElement>;
let instrumentalBg: SVGElement;

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
    private acousticnessSvc: AcousticNessService,
    private instrumentalSvc: InstrumentalService,
    private tooltipSvc: TooltipService,
  ) { }


  @Input() data!: {
    averages: Averages
    highlights: Highlights
  };
  @Input() isOpen!: boolean;
  @Input() hasVisData: boolean = false;

  first: boolean = true;

  gifSource!: { name: string, source: string }[];

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpen) {
      if (this.first) {
        this.first = !this.first;
        // speel animatie dingetje af
      }

      if (this.hasVisData) {
        console.log(this.data.averages);
        const dance = this.danceSvc.genDanceability(this.data.averages.danceability);
        const energy = this.energySvc.genEnergy(this.data.averages.energy);
        const acousticness = this.acousticnessSvc.genAcousticness(this.data.averages.acousticness);
        const instrumentalness = this.instrumentalSvc.genInstrumentalness(this.data.averages.instrumentalness);

        type energyKey = keyof typeof energy;

        type acousticWavesKey = keyof typeof acousticness.soundWaves;
        type acousticSpeakersKey = keyof typeof acousticness.speakers;

        for (let i = 0; i < danceContainers.length; i++) {
          danceContainers[i].innerHTML = dance.gifs[i];
        }
        this.gifSource = dance.source;

        // energyGroups.forEach(group => {
        //   group.innerHTML = energy[group.classList[1] as energyKey];
        // })

        acousticWaveGroups.forEach(group => {
          group.innerHTML = acousticness.soundWaves[group.classList[1] as acousticWavesKey];
        })

        acousticSpeakerGroups.forEach(group => {
          group.innerHTML = acousticness.speakers[group.classList[1] as acousticSpeakersKey];
        });

        instrumentalBg.insertAdjacentHTML('beforeend', instrumentalness);
      }
    }
  }

  ngOnInit(): void {
    window.addEventListener("scroll", () => {
      if (scrollY > 240 && scrollY < 280 && this.isOpen) {
        document.querySelector('.back')?.classList.add('hidden');
      } else {
        document.querySelector('.back')?.classList.remove('hidden');
      }
    });
  }

  ngAfterViewInit(): void {
    // haalt alle elementen op die we nodig hebben
    mainElement = document.querySelector('main')!;
    danceContainers = document.querySelectorAll('.dancecontainer')!;
    energyGroups = document.querySelectorAll('.energygroup');
    acousticWaveGroups = document.querySelectorAll('.acousticwavegroup');
    acousticSpeakerGroups = document.querySelectorAll('.speakergroup');
    instrumentalBg = document.querySelector('.instrumental')!;

    // tooltip ding
    mainElement.addEventListener('mousemove', (e) => {
      this.tooltipSvc.doTooltip(e);
    });
  }

  togglePanel(e: HTMLElement) {
    //haalt eerst alle popups die open staan weg (behalve degene die we willen togglen)
    document.querySelectorAll('.panel')?.forEach((el: any) => {
      el.classList.contains(e.dataset['panel']) ? null : el.classList.add('hidden');
    });

    const panel: HTMLElement = document.querySelector(`.${e.dataset['panel']}`)!;
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
      setTimeout(() => {
        panel.classList.add('delayedzindex');
      }, 500);
    } else {
      panel.classList.remove('delayedzindex');
    }

  }

  toggleFilters(element: HTMLInputElement) {
    //zoek alle elementen die de id hebben van de checkbox en geef ze de class hidden
    document.querySelectorAll(`.${element.id}`)?.forEach(el => {
      el.classList.toggle('hidden');
    });
  }
}
