import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class DataService {

  constructor(public http: AuthHttp) {
    console.log('Hello DataService Provider');
  }

  data() {
    return new Promise((resolve, reject) => {
      this.http.get("http://localhost:3001/api/protected/random-quote")
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          resolve(data);
        },
        err => {
          reject(err);
        }
        
        );
    }).catch(function(e) {
      console.log("Error: " + e); // "oh, no!"
    });
  }

}
