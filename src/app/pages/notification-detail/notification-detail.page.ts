import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';
import { Notifications } from 'src/app/providers';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage implements OnInit {

  record: any = {};

  constructor(public notifications: Notifications,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router){ }

  ngOnInit() {
    this.getNotification();
  }

  async getNotification() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.notifications.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    await this.notifications.recordDelete(id).then((res: ApiResponse) => {
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
