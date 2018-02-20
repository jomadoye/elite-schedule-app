import { EliteApi } from './../../shared/elite-api.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TeamsPage } from '../pages'

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private eliteApi: EliteApi,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Getting tournaments....'
    });
    loader.present().then(() => {
      this.eliteApi.getTournaments()
        .then(data => {
          this.tournaments = data;
          loader.dismiss();
        });
    })
  }

  itemTapped($event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

}
