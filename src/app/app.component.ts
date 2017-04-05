import { Component } from '@angular/core';
import { DeviceService } from './services/devices.service';
import { AttributeService } from './services/attributes.service';
import { DataService } from './services/data.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DeviceService, AttributeService, DataService ]
})
export class AppComponent {
  
}
