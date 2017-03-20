import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';

import {DataService} from '../../providers/data-service';

import {LoginPage} from '../login/login';

@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {
  constructor(private auth: AuthService, private data: DataService, private nav: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Work Page');
  }
  
  logout() {
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

  loadData() {
    this.data.data();
  }
}