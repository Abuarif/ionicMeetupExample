import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { WorkPage } from '../work/work';
import { DataService } from '../../providers/data-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  loading: any;
  error: boolean;


  constructor(private auth: AuthService, private data: DataService, private nav: NavController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');

    this.email = "chuck@chuck.com";
    this.password = "norris";

  }

  login() {

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    console.log(credentials);
    this.auth.login(credentials).then(
      (success) => {
        this.loading.dismiss();
        console.log("Success-melding na login functie in login.ts: ")
        console.log(success);
        this.nav.setRoot(WorkPage);

        this.error = false;
      },
      (err) => {
        this.loading.dismiss();
        console.log("Err-melding na login functie in login.ts: ")
        console.log(err);

        this.error = true;
      }
    );
  }


  openWorkPage() {
    this.nav.push(WorkPage);
  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
}