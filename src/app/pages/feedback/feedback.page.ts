import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService, AlertService } from 'src/app/services';
import {ApiResponse, Feedback} from 'src/app/models';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  page = 'Notifications';
  records: any;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getFeedbacks();
  }

  async getFeedbacks() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.api.getFeedback('').subscribe((res: ApiResponse) => {
        console.log(res);
        this.records = res.payload.filter((item) => item.deleted === false);
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
      });
  }
}
