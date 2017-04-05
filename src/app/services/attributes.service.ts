import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AttributeService {
    constructor(private _http: Http) {

    }

    getAttributes() {
        return this._http.get('/api/v1/attributes')
            .map(res => res.json());
    }

    saveAttribute(attribute) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/attribute', JSON.stringify(attribute), {headers: headers})
            .map(res => res.json());
    }

    updateAttribute(attribute) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/attribute/'+ attribute._id, JSON.stringify(attribute), {headers: headers})
            .map(res => res.json());
    }

    deleteAttribute(id) {
        return this._http.delete('/api/v1/attribute/'+id)
            .map(res => res.json());
    }
}