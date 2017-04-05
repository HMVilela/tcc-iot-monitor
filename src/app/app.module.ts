import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from './charts/charts.module';

import { DialogModule } from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';


import { AppComponent } from './app.component';
import { DevicesComponent } from './devices/devices.component';

import { AlertModule } from 'ng2-bootstrap';



import { Ng2IpModule } from 'ng2-ip';

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    ButtonModule,
    ChartsModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    HttpModule,
    MessagesModule,
    Ng2IpModule,
    SpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
