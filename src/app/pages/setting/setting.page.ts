import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  page = 'Setting';
  records: any;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController) { }

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
    await this.api.getSetting('/public').subscribe((res: ApiResponse) => {
        console.log(res);
        this.records = res.payload;
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
      });
  }
}
