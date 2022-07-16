import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialComponent } from './initial/initial.component';
import { ServicesModule } from './shared/services/services.module';

@NgModule({
  declarations: [AppComponent, InitialComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ServicesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
