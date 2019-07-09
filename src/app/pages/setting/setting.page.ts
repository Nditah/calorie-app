import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Location } from '@angular/common';
import { ApiService, AlertService } from 'src/app/services';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  editForm: FormGroup;
  record = {
    version: '1',
    name: 'Afro Calorie vs 1.0.1',
    theme: 'light',
    weight: 'kg',
    height: 'cm',
    food_quantity: 'g',
    drink_quantity: 'ml',
  };
  isReadyToSave = false;

  // below unused
  lang: any;
  enableNotifications: any;
  paymentMethod: any;
  currency: any;
  enablePromo: any;
  enableHistory: any;

  languages: any = ['English', 'Portuguese', 'French'];
  paymentMethods: any = ['Paypal', 'Credit Card'];
  currencies: any = ['USD', 'BRL', 'EUR'];

  constructor(
    private storage: NativeStorage,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private location: Location,
    private formBuilder: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
    // this.getSettings();
  }

  ionViewWillEnter() {
    this.setForm();
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      theme: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      food_quantity: [null, Validators.required],
      drink_quantity: [null, Validators.required],
    });
  }

  setForm() {
    this.editForm.controls['theme'].setValue(this.record.theme);
      this.editForm.controls['weight'].setValue(this.record.weight);
      this.editForm.controls['height'].setValue(this.record.height);
      this.editForm.controls['food_quantity'].setValue(this.record.food_quantity);
      this.editForm.controls['drink_quantity'].setValue(this.record.drink_quantity);
  }

  async getSettings() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();

    this.storage.getItem('calorie-settings').then(val => {
      const record = JSON.parse(val);
      if (!!record) {
        this.record = Object.assign({}, record);
      }
      loading.dismiss();
    }).catch(err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
    });
  }

  async submitRecord() {
    const payload = this.editForm.value;
    this.storage.setItem('calorie-settings', payload).then(() => {
      // this.getSettings();
      this.alertService.presentToast('Options saved successfully!');
    },
    error => console.error('Error storing item user', error)
  );
  }
  cancel() {
    this.location.back();
  }

  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('login');
  }
}
