import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {

  isVisible = true;

  constructor() {

   }

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = false;
    }, 4000);
  }

}
