import { Component, OnInit } from '@angular/core';
import Resources from '../../class/resources.class';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../styles/main.scss', './about.component.scss'],
})
export class AboutComponent implements OnInit {
  resources: Resources;
  siteName: string;
  countryName: string;

  constructor() {
    this.resources = new Resources();
    this.siteName = this.resources.getSiteName();
    this.countryName = this.resources.getCountryName();
  }

  ngOnInit(): void {}
}
