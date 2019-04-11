import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.page.html',
  styleUrls: ['./feedback-detail.page.scss'],
})
export class FeedbackDetailPage implements OnInit {

  record: any = {};

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router){ }

  ngOnInit() {
    this.getFeedback();
  }

  async getFeedback() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.api.getFeedback(`?id=${id}`).subscribe((res: ApiResponse) => {
        if (res.success) {
          this.record = res.payload[0];
        }
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
      });
  }
  async delete(id) {
    const loading = await this.loadingCtrl.create({message: 'Deleting'});
    await loading.present();
    await this.api.deleteFeedback(id).subscribe((res: ApiResponse) => {
      if (res.success) {
        this.alertService.presentToast('Operation successful');
      }
      loading.dismiss();
        // this.location.back();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
