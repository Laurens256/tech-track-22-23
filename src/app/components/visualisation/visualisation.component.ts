import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';
import { DanceService, EnergyService, AcousticNessService, InstrumentalService, TooltipService } from 'src/app/core/services/visualisation';

let mainElement: HTMLElement;
let SVGElement: SVGElement;
let energyGroups: NodeListOf<SVGElement>;
let acousticWaveGroups: NodeListOf<SVGElement>;
let acousticSpeakerGroups: NodeListOf<SVGElement>;
let danceContainers: NodeListOf<HTMLDivElement>;
let instrumentalBg: SVGElement;

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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
        //speelt een disco animatie af wanneer je visualisatie eerste keer opent
        this.first = !this.first;
        setTimeout(() => {
          document.querySelector('app-disco')?.classList.add('visible');
          setTimeout(() => {
            document.querySelector('app-disco')?.remove();
            mainElement.classList.remove('discohidden');
          }, 4000);
        }, 600);
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
    SVGElement = document.querySelector('svg#room')!;
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
      el.classList.contains(e.dataset['panel']) ? null : el.classList.remove('delayedzindex');
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


  barStyleCount: number = 0;
  barStyle(width: number, i: number) {
    // geen idee waarom dit zo werkt maar functie moet 2x voor iedere bar worden aangeroepen zodat de juiste animatie wordt geladen
    if (this.barStyleCount > Object.keys(this.data.averages).length * 2) return;
    this.barStyleCount++;
    document.documentElement.style.setProperty(`--barwidth${i}`, `${width}%`);
    //definieert de kleur waar de animatie op eindigt
    if(width <= 33) {
      document.documentElement.style.setProperty(`--barcolor${i}`, `var(--barlow)`);
    } else if(width <= 66) {
      document.documentElement.style.setProperty(`--barcolor${i}`, `var(--barmid)`);
    } else {
      document.documentElement.style.setProperty(`--barcolor${i}`, `var(--barhigh)`);
    }
    //return hier zodat er niet 100.000 keer hetzelfde in de css wordt gezet
    if (this.barStyleCount > Object.keys(this.data.averages).length) return;

    //animatie voor de bars
    const sheet = window.document.styleSheets[0];
    sheet.insertRule(`@keyframes bar${i} { 0% { background: var(--barlow); width: 0%; } 50% { background: var(--barmid); width: calc(var(--barwidth${i}) / 2); } 100% { background: var(--barcolor${i}); width: var(--barwidth${i}); } }`, sheet.cssRules.length);

    // laat animatie spelen als de bars in beeld komen
    sheet.insertRule(`app-visualisation main aside.rawdatacontainer:not(.hidden) ul li:nth-of-type(${i+1})>div>div {animation-name: bar${i};animation-delay: ${i * 0.5 + 0.5}s;background: var(--barcolor${i});}`, sheet.cssRules.length);
    return;
  }

  toggleFilters(element: HTMLInputElement) {
    //zoek alle elementen die de id hebben van de checkbox en geef ze de class hidden
    document.querySelectorAll(`.${element.id}`)?.forEach(el => {
      el.classList.toggle('hidden');
    });
  }
}
