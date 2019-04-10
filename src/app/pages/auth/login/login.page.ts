import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ApiResponse, LoginResponse } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  validateEmail(email) {
      const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
      return re.test(email);
  }


  login(form: NgForm) {
    const { username, password } = form.value;
    const payload = { email: '', password, phone: '' };
    if (this.validateEmail(username)) {
      payload.email = username;
    } else {
      payload.phone = username;
    }
    this.authService.login(payload)
    .subscribe((data: LoginResponse) => {
      if (data.success) {
        this.alertService.presentToast('Logged In');
      } else {
        this.alertService.presentToast(`Failed to login ${data.message}`);
      }
      },
      error => {
        this.alertService.presentToast('Network failure or server unavailable');
        console.log(error.message);
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }

}
