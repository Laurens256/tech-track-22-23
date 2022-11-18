import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit {

  constructor() { }

  @Input() data!: any;


  ngOnInit(): void {
    // console.log('ja');
    // console.log(this.data);
  }

}
