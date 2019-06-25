import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { AlertService, AuthService } from 'src/app/services';
import { LoginResponse, ApiResponse } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public signupForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([ Validators.required])],
      'phone': [null],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  async signup() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.present();

    const payload = this.signupForm.value;
    payload.type = 'USER';
    console.log(payload);
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home-location');
    });
    this.authService.userCreate(payload).subscribe((data: ApiResponse) => {
      console.log('Registration response ', data);
      if (data.success) {
        const { email, phone, password } = payload;
        this.authService.userLogin({ email, phone, password })
        .then((response: LoginResponse) => {
          console.log(response);
            if (!response.success) {
              this.alertService.presentToast(response['message']);
            this.navCtrl.navigateRoot('/dashboard');
            }
          },
          error => {
            this.alertService.presentToast('Network failure or server unavailable');
            console.log(error);
          });
        }
        this.alertService.presentToast(data.message);
      },
      error => { console.log(error.error); },
      () => {}
    );
  }


  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
