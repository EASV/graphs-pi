import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphsComponent } from './temperatures/graphs/graphs.component';
import { HomeComponent } from './home/home.component';
import {MzButtonModule, MzInputModule, MzNavbarModule, MzToastModule} from 'ngx-materialize';
import {ChartsModule} from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { TempFakerComponent } from './faking-it/temp-faker/temp-faker.component';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'm20.cloudmqtt.com',
  protocol: 'wss',
  port: 33758,
  username: 'pimate',
  password: 'Pimate123!',
  path: '/'
};


@NgModule({
  declarations: [
    AppComponent,
    GraphsComponent,
    HomeComponent,
    TempFakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MzButtonModule,
    ChartsModule,
    MzNavbarModule,
    HttpClientModule,
    MzInputModule,
    MzToastModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  exports: [
    MzButtonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
