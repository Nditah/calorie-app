import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, LoadingController} from '@ionic/angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  item: any;
  form: FormGroup;
  profileDetails: any[];
  private isDisabled = true;
  private caption_name = 'EDIT';

  user: User = {
    id: '',
    type: 'USER',
    username: 'Slim Eve',
    gender: 'MALE',
    email: 'admin@calorie.com',
    password: 'password',
    birth_date: new Date('1996-05-13'),
    phone: '',
    country_iso2: '',
    is_email_verified: false,
    is_phone_verified: false,
    original_mass: 95,
    current_mass: 90,
    desired_mass: 84,
    height: 75,
    lifestyle: '',
    logs: [], // Log
    feedbacks: [], // Feedback
    is_complete: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  constructor(private menu: MenuController,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController) {

    this.menu.enable(true);
    this.form = this.formBuilder.group({
      username: [''],
      gender: [''],
      email: [''],
      password: [''],
      birth_date: [''],
      phone: [''],
      country_iso2: [''],
      original_mass: [''],
      current_mass: [''],
      desired_mass: [''],
      height: [''],
      lifestyle: [''],
    });

}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.getUser().then(user => {
        // this.user = user;
        console.log(user);
      }
    );
  }

  changedSmtng() {
    this.caption_name = 'SAVE';
  }

  async editProfile() {
    if (this.caption_name === 'EDIT') {
      this.isDisabled = false;
      this.caption_name = 'CANCEL';
    } else if (this.caption_name === 'SAVE') {
      if (!(this.user.username &&
        this.user.email &&
        this.user.password &&
        this.user.phone)) {
        const loading = await this.toastCtrl.create({
          message: 'Validation errors !',
          duration: 2000,
          position: 'top'
        });
        await loading.present();
      } else {
        const loading = await this.loadingCtrl.create({
          message: 'Please wait...'
        });
        await loading.present();

        setTimeout(async() => {
          loading.dismiss();
          const toast = await this.toastCtrl.create({
            message: 'You have successfully updated your details .',
            duration: 2000,
            position: 'top'
          });
          this.caption_name = 'EDIT';
          this.isDisabled = true;
          await toast.present();

        }, 2000);
      }
    } else if (this.caption_name === 'CANCEL') {
      this.isDisabled = true;
      this.caption_name = 'EDIT';
    }
  }

}
