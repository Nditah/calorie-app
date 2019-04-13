import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiService, AlertService } from 'src/app/services';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  page = 'Setting';
  editForm: FormGroup;

  records = {
    version: '1',
    name: 'Afro Calorie vs 1.0.1',
    theme: 'LIGHT',
    weight: 'KG',
    height: 'CM',
    calories: 'JOULES',
  };

  constructor(
    private storage: NativeStorage,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder) {
      this.editForm = this.formBuilder.group({
        theme: [null, Validators.required],
        weight: [null, Validators.required],
        height: [null, Validators.required],
        calories: [null, Validators.required],
      });
    }

  ngOnInit() {
    this.getSettings();
  }

  async getSettings() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    this.storage.getItem('settings').then(val => {
      const record = JSON.parse(val);
      this.editForm.controls['theme'].setValue(record.theme);
      this.editForm.controls['weight'].setValue(record.weight);
      this.editForm.controls['height'].setValue(record.height);
      this.editForm.controls['calories'].setValue(record.calories);
      loading.dismiss();
    }).catch(err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
    });
  }

  async submitRecord() {
    const payload = this.editForm.value;
    this.storage.setItem('settings', payload).then(() => {
      // this.getSettings();
      this.alertService.presentToast('Options saved successfully!');
    },
    error => console.error('Error storing item user', error)
  );
  }
}
