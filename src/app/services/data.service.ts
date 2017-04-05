import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    constructor(private _http: Http) {

    }

    getDatas() {
        return this._http.get('/api/v1/datas')
            .map(res => res.json());
    }

    saveData(data) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/data', JSON.stringify(data), {headers: headers})
            .map(res => res.json());
    }

    updateData(data) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/data/'+ data._id, JSON.stringify(data), {headers: headers})
            .map(res => res.json());
    }

    deleteData(id) {
        return this._http.delete('/api/v1/data/'+id)
            .map(res => res.json());
    }
}