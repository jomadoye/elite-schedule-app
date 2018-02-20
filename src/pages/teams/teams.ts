import { EliteApi } from './../../shared/elite-api.service';
import { TeamHomePage } from './../team-home/team-home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import _ from 'lodash';
/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  tournament: any;
  teams = [];
  private allTeams: any;
  private allTeamDivisions: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;

    let loader = this.loadingCtrl.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
          _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
        this.teams = this.allTeamDivisions;
        console.log('division teams', this.teams);
        loader.dismiss();
      });
    });
  }

  itemTapped(event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }
}
