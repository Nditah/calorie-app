import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'pulse' },
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Log', url: '/log', icon: 'list' },
    { title: 'Food', url: '/food', icon: 'ice-cream' },
    { title: 'Exercise', url: '/exercise', icon: 'bicycle' },
    { title: 'Feedback', url: '/feedback', icon: 'checkmark-circle' },
    { title: 'Profile', url: '/user', icon: 'person' },
    { title: 'Setting', url: '/setting', icon: 'person' },
    { title: 'Images', url: '/image', icon: 'image' },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.getToken();
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
