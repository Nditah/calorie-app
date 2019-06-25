import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  validateEmail(email) {
    const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    return re.test(email);
  }

  async login2() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.present();

    const payload = this.loginForm.value;
    console.log(payload);
    loader.onWillDismiss().then(() => {
      this.goToHome();
    });
  }



async login() {
  const loader = await this.loadingCtrl.create({
    duration: 2000
  });
  loader.present();
  this.authService.userLogin(this.loginForm.value).then((data: any) => {
    console.log(data);
    if (data.success) {
      // this.alertService.presentToast('Login was successful');
      return this.goToHome();
    } else {
      this.alertService.presentToast(data.error.message || `Failed to login`);
      return;
    }
    }).catch(error => {
      this.alertService.presentToast(error.error.message || `Failed to login`);
      console.log(error.error.message);
      return;
    });
}


  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you Email to send a reset link password or Phone number for an OTP.',
      inputs: [
        { name: 'email', placeholder: 'Email', type: 'email' },
        { name: 'phone', placeholder: 'Phone', type: 'tel' },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: async(data) => {
            console.log('Send clicked', data);
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });
            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                message: 'Email was sended successfully',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            });
          }
        }
      ]
    });
    alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

}
