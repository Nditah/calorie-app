import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService, AlertService } from 'src/app/services';
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

  gotoRegister() {
    this.navCtrl.navigateRoot('/register');
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
    this.authService.login(payload).subscribe((data: any) => {
      console.log('Login response ', data);
      if (data.success) {
        this.alertService.presentToast('Logged In');
      } else {
        this.alertService.presentToast(`Failed to login ${data.message}`);
      }
      },
      error => {
        this.alertService.presentToast('Network failure or server unavailable');
        console.log('Login error');
        console.log(error.message);
      },
      () => {
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }

}
