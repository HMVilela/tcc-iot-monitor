import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DeviceService } from '../services/devices.service';
import { Device } from '../models/device.model';

import { IP_VALIDATION_TYPE, COPY_MODE_TYPE } from 'ng2-ip';

import { DialogModule } from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';



@Component({
  moduleId: module.id,
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit { 
  private deviceIcon = require("./assets/device-icon.png");
  devices: Device[];
  private chartData: Array<any>;
  private chart1Data: Array<any>;

  inputValidation: IP_VALIDATION_TYPE = 'block';
  disabledBlocks: boolean[] = [];
  highlightInvalidBlocks = true;
  theme: string = 'default';
  mode: string = 'ipv6';

  copyMode: COPY_MODE_TYPE = 'select';

  ip: string;
  prop_name: string;
  prop_interval: string;

  selectedValues: string[] = [];

  display: boolean = false;
  loading: boolean = true;
  msgs: MessagesModule[] = [];

    
  constructor(private _deviceService: DeviceService) { }

  ngOnInit() {
    this.devices = [];
    this._deviceService.getDevices()
      .subscribe(devices => {
        this.devices = devices;
      });
  }

  addDevice(event, device) {
    var result;
    var dateNow = Date.now();
    var newDevice = {
      _id: 0,      
      ip: this.ip,
      name: this.prop_name,
      interval: this.prop_interval,
      creation: ''+dateNow,
      modification: "novo"
    };

    result = this._deviceService.saveDevice(newDevice);
    result.subscribe(x => {
      newDevice._id = device._id;
      this.devices.push(newDevice);      
    });
    window.location.reload();
  }

  setEditState(device, state) {
    if(state) {
      device.isEditMode = state;
    } else {
      delete device.isEditMode;
    }
  }

  updateStatus(device) {    
    var dateNow = Date.now();
    var _device = {
      _id: device._id,
      ip: device.ip,
      name: device.name,
      interval: device.interval,
      creation: device.creation,
      modification: ''+dateNow
    };

    this._deviceService.updateDevice(_device)
      .subscribe(data => {
        device.modification = ''+dateNow;
      });
  }

  updateDeviceIp(event, device) {
    if(event.which === 13) {
      device.ip = event.target.value;
      var _device = {
        _id: device._id,
        ip: device.ip,
        name: device.name,
        interval: device.interval,
        creation: device.creation,
        modification: device.modification
      };

      this._deviceService.updateDevice(_device)
        .subscribe(data => {
          this.setEditState(device, false);
        });
    }
  }

  deleteDevice(device) {
    var devices = this.devices;

    this._deviceService.deleteDevice(device._id)
      .subscribe(data => {
        if(data.n ==1) {
          for(var i = 0; i < devices.length; i++) {
            if(devices[i]._id == device._id) {
              devices.splice(i, 1);
            }
          }
        }
      })
  }

  showDialog() {
        this.loading = false;
        this.display = true;
        this.showWarn();
    }

  show() {
    this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
  }

  hide() {
    this.msgs = [];
  }  

  showInfo() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
  }

  showWarn() {
      this.msgs = [];
      this.msgs.push({severity:'warn', summary:'Atenção', detail:'O dispositivo já existe.'});
  }

  showError() {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Erro', detail:'Validation failed'});
  }

  showMultiple() {
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Message 1', detail:'PrimeNG rocks'});
      this.msgs.push({severity:'info', summary:'Message 2', detail:'PrimeUI rocks'});
      this.msgs.push({severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'});
  }

  clear() {
      this.msgs = [];
  }
 
}