import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, LoadingController} from '@ionic/angular';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService, ApiService } from 'src/app/services';
import { User, ApiResponse } from 'src/app/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  editForm: FormGroup;
  isDisabled = true;
  caption_name = 'EDIT';

  user: User;

  constructor(private menu: MenuController,
      private authService: AuthService,
      private apiService: ApiService,
      private formBuilder: FormBuilder,
      private location: Location,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController) {

    this.menu.enable(true);

    this.editForm = this.formBuilder.group({
      username: [''],
      gender: [null],
      email: [''],
      password: [''],
      birth_date: [''],
      phone: [''],
      country_iso2: [null],
      original_mass: [''],
      desired_mass: [''],
      height: [''],
      lifestyle: [null],
    });

}

  ngOnInit() {
    this.authService.getUser().then(user => {
      this.user = user;
      console.log(user);
    });
   }

  ionViewWillEnter() {
    this.editForm.get('username').setValue(this.user.username || '');
    this.editForm.get('gender').setValue(this.user.gender || '');
    this.editForm.get('email').setValue(this.user.email || '');
    this.editForm.get('password').setValue(this.user.password || '');
    this.editForm.get('birth_date').setValue(this.user.birth_date || '');
    this.editForm.get('phone').setValue(this.user.phone || '');
    this.editForm.get('country_iso2').setValue(this.user.country_iso2 || '');
    this.editForm.get('original_mass').setValue(this.user.original_mass || '');
    this.editForm.get('desired_mass').setValue(this.user.desired_mass || '');
    this.editForm.get('height').setValue(this.user.height || '');
    this.editForm.get('lifestyle').setValue(this.user.lifestyle || '');
  }

  getDateString(str) {
      return `${new Date(str).toISOString().slice(0, 22)}Z`;
  }

  changedSmtng() {
    this.caption_name = 'SAVE';
  }

  async onSubmit() {
    const payload = this.editForm.value;

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    console.log('editForm payload ', payload);
    return this.apiService.updateUser(this.user.id, payload)
    .subscribe((data: ApiResponse) => {
        if (data.success) {
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
        } else {
          setTimeout(async() => {
            loading.dismiss();
            const toast = await this.toastCtrl.create({
              message: 'Updated failed ' + data.message,
              duration: 2000,
              position: 'top'
            });
            this.caption_name = 'EDIT';
            this.isDisabled = true;
            await toast.present();
  
          }, 2000);
        }
      }),  err => {
        loading.dismiss();
        console.log(err.message);
      };
  }

  async editProfile() {
    const payload = this.editForm.value;
    if (this.caption_name === 'EDIT') {
      this.isDisabled = false;
      this.caption_name = 'CANCEL';
    } else if (this.caption_name === 'SAVE') {
      if (!(payload.username && payload.email && payload.password &&
        payload.phone)) {
        const loading = await this.toastCtrl.create({
          message: 'Validation errors !',
          duration: 2000,
          position: 'top'
        });
        await loading.present();
      } else {
        await this.onSubmit();
      }
    } else if (this.caption_name === 'CANCEL') {
      this.isDisabled = true;
      this.caption_name = 'EDIT';
    }
  }
  cancel() {
    this.location.back();
  }
}
