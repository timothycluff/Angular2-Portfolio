/**
 * Created by tim.cluff on 4/7/2017.
 */


import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

const styles = require('./about.css');
const template = require('./about.html');

@Component({
    selector: 'about',
    template: template,
    styles: [ styles ]
})
export class About {
    jwt: string;
    decodedJwt: string;
    response: string;
    api: string;

    constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
        this.jwt = localStorage.getItem('id_token');
        this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    }

    logout() {
        localStorage.removeItem('id_token');
        this.router.navigate(['login']);
    }

    callAnonymousApi() {
        this._callApi('Anonymous', 'http://localhost:8080/api/random-quote');
    }

    callSecuredApi() {
        this._callApi('Anonymous', 'http://localhost:8080/api/protected/random-quote');
    }

    _callApi(type, url) {
        this.response = null;
        if (type === 'Anonymous') {
            // For non-protected routes, just use Http
            this.http.get(url)
                .subscribe(
                    response => this.response = response.text(),
                    error => this.response =  error.text()
                );
        }
        if (type === 'Secured') {
            // For protected routes, use AuthHttp
            this.authHttp.get(url)
                .subscribe(
                    response => this.response = response.text(),
                    error => this.response = error.text()
                );
        }
    }
}