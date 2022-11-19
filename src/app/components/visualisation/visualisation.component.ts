import { Component, OnInit, Input } from '@angular/core';

import { Averages, Highlights } from 'src/app/core/models';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit {

  constructor() { }

  @Input() data!: {
    averages: Averages
    highlights: Highlights
  };


  ngOnInit(): void {
    // console.log('ja');
    // console.log(this.data);
  }

}
