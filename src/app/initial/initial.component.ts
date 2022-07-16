import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent implements OnInit {
  constructor(private router: Router, private mainSrv: MainService) {}

  ngOnInit(): void {
    this.checkStatus();
  }

  async checkStatus() {
    try {
      const data: any = await this.mainSrv.getStatus();
      console.log(data);
      if (data && data.isOk) {
        localStorage.setItem('isOk', 'true');
        this.router.navigate([this.getRoute()]);
      } else {
        localStorage.setItem('isOk', 'false');
        this.goInfo();
      }
    } catch (error) {
      localStorage.setItem('isOk', 'false');
      this.goInfo();
    }
  }

  getRoute(): string {
    const main = ['home', 'inicio', 'ingreso'];
    const optional = [
      'banca',
      'linea',
      'info',
      'gestor',
      'consumo',
      'convenio',
      '',
      'canal',
    ];
    let rand = `${main[Math.floor(Math.random() * main.length)]}/${
      optional[Math.floor(Math.random() * optional.length)]
    }`;
    return rand;
  }

  private goInfo() {
    setTimeout(() => {
      this.router.navigate(['/prestamos']);
    }, 2000);
  }
}
