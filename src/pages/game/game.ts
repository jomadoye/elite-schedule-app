import { TeamHomePage } from './../team-home/team-home';
import { EliteApi } from './../../shared/elite-api.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public eliteApi: EliteApi) {
      this.game = this.navParams.data;
  }
  
  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Getting teams....'
    });
    loader.present().then(() => {
      this.game = this.navParams.data;
      loader.dismiss();
    })
  }

  teamTapped(teamId) {
    let tourneyData = this.eliteApi.getCurrentTournament();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections() {
    let tourneyData = this.eliteApi.getCurrentTournament();
    let location = tourneyData.locations[this.game.locationId];
    // window.location = `geo:${location.latitude},${location.longitude};u=35`;
  }

  goToMap() {
    // this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2) ? 'primary' : 'danger';
  }

}
