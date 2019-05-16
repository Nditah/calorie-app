import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Admob } from '@ionic-native/admob/ngx';

import { AuthService, AlertService, EnvService } from './services';

import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  // styleUrls: ['app.component.scss'],
})
export class AppComponent {

  showSplash = false;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'pulse' },
    { title: 'Record', url: '/log', icon: 'list' },
    { title: 'Feedback', url: '/feedback', icon: 'checkmark-circle' },
    { title: 'Food', url: '/food', icon: 'ice-cream' },
    { title: 'Exercise', url: '/exercise', icon: 'bicycle' },
    { title: 'Nutrient', url: '/nutrient', icon: 'image' },
    { title: 'Profile', url: '/user', icon: 'person' },
    { title: 'Setting', url: '/setting', icon: 'settings' },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    public router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private envService: EnvService,
    private adMob: Admob,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.getToken();
      this.InitAds();
      timer(3000).subscribe(() => this.showSplash = false );
    });
  }


  logout() {
    this.authService.logout().then(data => {
        this.alertService.presentToast(data['message']);
      }).catch(error => {
        console.log(error);
      });
      return this.navCtrl.navigateRoot('/landing');
  }

  showBannerAds() {
    this.adMob.createBannerView()
      .then(
        () => {
          console.log('Ad Ok');
        },
        () => {
          this.showBannerAds();
        })
      .catch(console.log);
  }

  showInstantialAds() {
    this.adMob.requestInterstitialAd()
      .then(
        () => {
          console.log('Ad Ok');
        },
        () => {
          this.showInstantialAds();
        })
      .catch(console.log);
  }

  InitAds() {
    this.adMob.setOptions({
      isTesting: false,
      autoShowBanner: true,
      autoShowInterstitial: true,
      publisherId: this.envService.adMobPubId,
      interstitialAdId: this.envService.adMobIntId,
    })
      .then(() => {
        this.showBannerAds();
        setInterval(() => {
          this.showInstantialAds();
        }, 60000 * 10);
      })
      .catch(console.log);
  }
}
