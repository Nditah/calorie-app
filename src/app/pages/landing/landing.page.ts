import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, Platform, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: NativeStorage,
    private platform: Platform,
  ) {
    this.menu.enable(false);
  }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if (this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/dashboard');
      }
    });
  }

  ngOnInit() {

  }

  gotoLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  gotoRegister() {
    this.navCtrl.navigateRoot('/register');
  }
}
