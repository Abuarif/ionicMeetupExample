import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    LOGIN_URL: string = "http://localhost:3001/sessions/create";
    SIGNUP_URL: string = "http://localhost:3001/users";
    storage: Storage = new Storage();
    jwtHelper: JwtHelper = new JwtHelper();
    user: string;
    logged_in: boolean;
    error: string;
    myHeader = new Headers();

    token: string;

    constructor(private http: AuthHttp) {

        console.log("Hello Auth Service");

        this.logged_in = false;


        this.storage.get('id_token').then(token => {
            if (tokenNotExpired(null, token)) {
                //this.user = this.jwtHelper.decodeToken(token).user_id;
                console.log("Auth is geladen");
            }
        });

        this.myHeader.append('Content-Type', 'application/json');
    }



    loggedIn() {
        return tokenNotExpired();
    }

    login(credentials) {
        console.log("We gaan inloggen met", JSON.stringify(credentials));

        return new Promise((resolve, reject) => {
            this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.myHeader })
                .map(res => res.json())
                .subscribe(
                data => {
                    console.log("Ontvangen: ");
                    console.log(data);
                    this.authSuccess(data.id_token);
                    resolve(data)
                },
                err => {
                    this.error = err;
                    reject(err)
                }
                );
        });
    }
    signup(credentials) {
        return new Promise((resolve, reject) => {
            this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.myHeader })
                .map(res => res.json())
                .subscribe(
                data => {
                    this.authSuccess(data.id_token);
                    resolve(data)
                },
                err => {
                    this.error = err;
                    reject(err)
                }
                );
        });
    }
    logout() {
        this.storage.remove('id_token');
        this.user = null;
        this.logged_in = false;
    }
    authSuccess(token) {
        console.log("Token te verwerken: " + token);
        this.error = null;
        this.storage.set('id_token', token);
        this.user = this.jwtHelper.decodeToken(token).user_id;
        this.logged_in = true;
    }
}