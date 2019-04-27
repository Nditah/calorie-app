import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username = 'Telixia Talent';
  record: any;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getHomes();
  }

  async getHomes() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.api.getSetting('/public').subscribe((res: ApiResponse) => {
        console.log(res);
        this.record = res.payload;
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
      });
  }
}
