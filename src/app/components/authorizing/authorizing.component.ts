import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorizing',
  templateUrl: './authorizing.component.html',
  styleUrls: ['./authorizing.component.css']
})
export class AuthorizingComponent implements AfterViewInit {

  constructor(
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.router.navigate(['home']);
  }

}
