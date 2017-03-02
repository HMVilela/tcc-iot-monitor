import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../devices.service';
import { Device } from '../devices/devices.model';

@Component({
  moduleId: module.id,
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit { 
  devices: Device[];
  private chartData: Array<any>;
  constructor(private _deviceService: DeviceService) {

  }

  ngOnInit() {
    this.devices = [];
    this._deviceService.getDevices()
      .subscribe(devices => {
        this.devices = devices;
      });

    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (10 + Math.floor(Math.random() * 100)); i++) {
      this.chartData.push([
        `Param[${i}]`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }

  addDevice(event, deviceIp) {
    var result;
    var dateNow = Date.now();
    var newDevice = {
      _id: 0,      
      ip: deviceIp.value,
      name: 'device###',
      interval: 'interval data',
      structure: 'structure data',
      extra: 'extra data',      
      createdAt: ''+dateNow,
      updatedAt: "criado",
      isCompleted: false
    };

    

    result = this._deviceService.saveDevice(newDevice);
    result.subscribe(x => {
      newDevice._id = deviceIp._id;
      this.devices.push(newDevice);
      deviceIp.value = '';
    });
  }

  setEditState(device, state) {
    if(state) {
      device.isEditMode = state;
    } else {
      delete device.isEditMode;
    }
  }

  updateStatus(device) {
    var _device = {
      _id: device._id,
      ip: device.ip,
      name: device.name,
      interval: device.interval,
      structure: device.structure,
      extra: device.extra,
      createdAt: device.createdAt,
      updatedAt: device.updatedAt,
      isCompleted: !device.isCompleted

    };

    this._deviceService.updateDevice(_device)
      .subscribe(data => {
        device.isCompleted = !device.isCompleted;
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
        structure: device.structure,
        extra: device.extra,
        createdAt: device.createdAt,
        updatedAt: device.updatedAt,
        isCompleted: device.isCompleted

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
}