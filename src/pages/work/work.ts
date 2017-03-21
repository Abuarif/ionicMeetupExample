import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import { DataService } from '../../providers/data-service';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {

  quote: any;

  constructor(private auth: AuthService, private data: DataService, private nav: NavController) { }

  ionViewDidLoad() {
    console.log('Hello Work Page');
    this.quote = "";
  }

  logout() {
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

  loadData() {
    this.data.data()
    .then(data => {
      this.quote = data;
    });
  }
}