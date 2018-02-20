import { EliteApi } from './../shared/elite-api.service';
import { StandingsPage } from './../pages/standings/standings';
import { TeamHomePage } from './../pages/team-home/team-home';
import { MyTeamsPage } from './../pages/my-teams/my-teams';
import { TeamsPage } from './../pages/teams/teams';
import { TeamDetailPage } from './../pages/team-detail/team-detail';
import { TournamentsPage } from './../pages/tournaments/tournaments';
import { GamePage } from './../pages/game/game';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    MyTeamsPage,
    GamePage,
    StandingsPage,
    TeamHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    MyTeamsPage,
    StandingsPage,
    TeamHomePage,
    GamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApi,
    HttpModule
  ]
})
export class AppModule {}
