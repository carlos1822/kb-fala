import { Component, OnInit } from '@angular/core';
import Resources from '../../class/resources.class';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../styles/main.scss', './contact.component.scss'],
})
export class ContactComponent implements OnInit {
  resources: Resources;
  email: string;
  phone: string;
  displayPhone: string;

  constructor() {
    this.resources = new Resources();
    this.email = this.resources.getEmail();
    this.phone = this.resources.getPhone();
    this.displayPhone = this.resources.getDisplayPhone();
  }

  ngOnInit(): void {}
}
