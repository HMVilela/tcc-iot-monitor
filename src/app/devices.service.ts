import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DeviceService {
    constructor(private _http: Http) {

    }

    getDevices() {
        return this._http.get('/api/v1/devices')
            .map(res => res.json());
    }

    saveDevice(device) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/device', JSON.stringify(device), {headers: headers})
            .map(res => res.json());
    }

    updateDevice(device) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/device/'+ device._id, JSON.stringify(device), {headers: headers})
            .map(res => res.json());
    }

    deleteDevice(id) {
        return this._http.delete('/api/v1/device/'+id)
            .map(res => res.json());
    }
}