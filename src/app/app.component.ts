import { Component } from '@angular/core';
import { DeviceService } from './devices.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DeviceService ]
})
export class AppComponent {
  
}
