import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-disco',
  templateUrl: './disco.component.html',
  styleUrls: ['./disco.component.scss']
})
export class DiscoComponent implements OnInit {

  @Input() energy: number = 101;

  constructor() { }

  ngOnInit(): void {
  }

}
