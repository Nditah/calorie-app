import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';
import { Logs } from 'src/app/providers';


@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {

  records: any;

  constructor(public api: ApiService,
    public logs: Logs,
    public loadingCtrl: LoadingController) {
      this.records = this.logs.query();
    }

  ngOnInit() {
    // this.getLogs();
  }

  async getLogs() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.logs.recordRetrieve('').then((res: ApiResponse) => {
        console.log(res);
        this.records = res.payload;
        loading.dismiss();
      });
  }
}
