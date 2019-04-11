import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiResponse, LoginResponse } from 'src/app/models';
import { AuthService, AlertService } from 'src/app/services';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  register(form: NgForm) {
    const payload = {
      type: 'USER',
      username: form.value.username,
      gender: form.value.gender, // ["MALE", "FEMALE"]
      phone: form.value.phone,
      country_iso2: form.value.country_iso2,
      email: form.value.email,
      password: form.value.password,
      original_mass: form.value.original_mass, //number down
      desired_mass: form.value.desired_mass,
      height: form.value.height,
      lifestyle: form.value.lifestyle,
    };
    this.authService.register(payload).subscribe((data: ApiResponse) => {
      console.log(data);
      if (data.success) {
        const { email, phone, password } = payload;
        this.authService.login({ email, phone, password })
        .subscribe((response: LoginResponse) => {
          console.log(response);
            if (!response.success) {
              this.alertService.presentToast(response['message']);
            }
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('/dashboard');
          }
        );
        }
        this.alertService.presentToast(data.message);
      },
      error => { console.log(error); },
      () => {}
    );
  }
}
