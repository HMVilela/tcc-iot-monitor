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
  devices: any;

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

  temperValue: string = "0";
  pressureValue: string = "0";
  lumenValue: string = "0";
  switchValue: string = "0";

  deviceId: any;
  deviceIp: string;
  deviceName: string;
  deviceInterval: string;
  deviceCreation: string;

  newDeviceDialog: boolean = false;
  editDeviceDialog: boolean = false;
  loading: boolean = false;
  msgs: MessagesModule[] = [];

    
  constructor(private _deviceService: DeviceService) {
    this.temperValue = "25";
    this.pressureValue = "30";
    this.lumenValue = "20";
    this.switchValue = "5";
   }

  ngOnInit() {
    this.devices = [];
    this._deviceService.getDevices()
      .subscribe(devices => {
        this.devices = devices;
      });
  }

  addDevice(device, ip) {
    var result;
    var dateNow = Date.now();
    var newDevice = {
      ip: this.ip,
      name: this.deviceName,
      interval: this.deviceInterval,
      attributes: {
        temperature: false,
        pressure: false,
        luminosity: false,
        switch: false
      },
      creation: ''+dateNow,
      modification: "novo"
    };
    for (let attribute of this.selectedValues) {
      if(attribute == "temperatura")
        newDevice.attributes.temperature = true;
      if(attribute == "pressao")
        newDevice.attributes.pressure = true;
      if(attribute == "luminosidade")
        newDevice.attributes.luminosity = true;
      if(attribute == "switch")
        newDevice.attributes.switch = true;
    }
    console.log(newDevice);
    result = this._deviceService.saveDevice(newDevice);
    result.subscribe(device => {
      this.devices.push(device);
      this.newDeviceDialog = false;
      this.loading = false;      
    });
  }

  updateDevice(device) {    
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
        this.ngOnInit();
        this.editDeviceDialog = false;
        device = device;
      });
  }

  deleteDevice(device) {
    var devices = this.devices;

    this._deviceService.deleteDevice(device._id)
      .subscribe(data => {
        if(data.n == 1) {
          for(var i = 0; i < devices.length; i++) {
            if(devices[i]._id == device._id) {
              devices.splice(i, 1);
            }
          }
        }
      })
  }
  
  setEditState(device, state) {
    if(state) {
      device.isEditMode = state;
    } else {
      delete device.isEditMode;
    }
  }

  createNewDevice() {

    this.loading = true;

    if(this.ip == null) {
      this.showInfo();
      this.loading = false;
    }
    else {
      if(this.devices.find(device => device.ip === this.ip)) {
        this.showWarn();
        this.loading = false;
      }
      else if(!this.devices.find(device => device.ip === this.ip)) {
        //aqui entra o discovery
        this.newDeviceDialog = true;
      }
    }
  }

  showEditDeviceDialog(device) {

    this.deviceId = device._id;
    this.deviceIp = device.ip;
    this.deviceName = device.name;
    this.deviceInterval = device.interval;
    this.deviceCreation = device.creation;
    this.editDeviceDialog = true;
  }

  preparetoUpdate() {
    var device = {
      _id: this.deviceId,
      ip: this.deviceIp,
      name: this.deviceName,
      interval: this.deviceInterval,
      creation: this.deviceCreation,
      modification: ""
    }
    this.updateDevice(device);

  }

  show() {
    this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
  }

  hide() {
    this.msgs = [];
  }  

  showInfo() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Atenção', detail:'É necessário digitar um IPv6 válido.'});
  }

  showWarn() {
      this.msgs = [];
      this.msgs.push({severity:'warn', summary:'Atenção', detail:'Já existe um dispositivo com o IPv6 informado.'});
  }

  showError() {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Erro', detail:'Algo saiu errado.'});
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