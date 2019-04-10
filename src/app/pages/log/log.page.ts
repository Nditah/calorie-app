import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';


@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {

  page = 'Log';
  records: any;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getLogs();
  }

  async getLogs() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.api.getLog('').subscribe((res: ApiResponse) => {
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
