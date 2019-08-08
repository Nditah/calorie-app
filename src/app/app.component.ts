import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  showSplash = true;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'pulse' },
    { title: 'Log', url: '/log', icon: 'list' },
    { title: 'Feedback', url: '/feedback', icon: 'checkmark-circle' },
    { title: 'Food', url: '/food', icon: 'ice-cream' },
    { title: 'Exercise', url: '/exercise', icon: 'bicycle' },
    { title: 'Nutrition', url: '/minivite', icon: 'image' },
    { title: 'Profile', url: '/user', icon: 'person' },
    { title: 'Setting', url: '/setting', icon: 'settings' },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.authService.getToken();
      this.backEvent();

      setTimeout(() => {
        console.log(this);
        this.splashScreen.hide();
        this.showSplash = false;
      }, 3000);
    });
  }

  backEvent() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url.includes('home')) {
        this.alertService.alert(
          'Exit Application!',
          'Press okay to <strong>Exit</strong> this App.',
          () => {
            console.log('Confirm Exit Cancel');
          },
          () => {
            console.log('Confirm Exit Okay');
            navigator['app'].exitApp();
          });
      } else {
        window.history.back();
      }
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

}
