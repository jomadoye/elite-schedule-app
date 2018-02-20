import { GamePage } from './../game/game';
import { EliteApi } from './../../shared/elite-api.service';
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  ToastController } from 'ionic-angular';
import _ from 'lodash';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  private tournamentData: any;
  private allGames: any[];
  public dateFilter: string;
  public isFollowing = false;
  public team: any = {}; 
  public teamStanding: any = {};
  public games: any[];
  private tourneyData: any;
  public useDateFilter = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public eliteApi: EliteApi) {
    this.team = this.navParams.data
  }

  ionViewDidLoad (){
    let loader = this.loadingCtrl.create({
      content: 'Getting Opponents....'
    });
    this.team = this.navParams.data;
    this.tournamentData = this.eliteApi.getCurrentTournament();

    loader.present().then(() => {
      this.games =  _.chain(this.tournamentData.games)
        .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
        .map(g => {
          let isTeam1 = (g.team1Id === this.team.id);
          let opponentName = isTeam1 ? g.team2 : g.team1;
          let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
          return {
            gameId: g.id,
            opponent: opponentName,
            time: Date.parse(g.time),
            location: g.location,
            locationUrl: g.locationUrl,
            scoreDisplay: scoreDisplay,
            homeAway: (isTeam1 ? "vs." : "at")
          };
        })
        .value();
        loader.dismiss();
        })
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreDisplayBadgeClass(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger'; 
  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : ''; 
  }

  refreshAll(refresher) {
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfolow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              // this.userSettings.unfavoriteTeam(this.team);

              let toast = this.toastController.create({
                message: 'You have unfollwed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true; 
    //   this.userSettings.favoriteTeam(
    //     this.team, 
    //     this.tourneyData.tournament.id, 
    //     this.tourneyData.tournament.name);
    }

  }

}
