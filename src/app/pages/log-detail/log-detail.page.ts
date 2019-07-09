import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services';
import { ApiResponse, Log } from 'src/app/models';
import { Logs } from 'src/app/providers';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.page.html',
  styleUrls: ['./log-detail.page.scss'],
})
export class LogDetailPage implements OnInit {

  record: Log = {};
  recordId: any = '';

  constructor(public logs: Logs,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router) {
      this.recordId = this.route.snapshot.paramMap.get('id');
      this.record = logs.query({ id: this.recordId })[0] || {};
    }

  ngOnInit() {
    // this.getLog();
  }

  async getLog() {
    this.recordId = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    try {
      const res: ApiResponse = await this.logs.recordRetrieve(`?_id=${this.recordId}`);
      if (res.success) {
        this.record = res.payload[0];
      }
      loading.dismiss();
      this.alertService.presentToast(res.message);
      } catch (err) {
        console.log(err);
        this.alertService.presentToast(err.message);
      }
  }

  async delete(id) {
    const loading = await this.loadingCtrl.create({message: 'Deleting'});
    await loading.present();
    await this.logs.recordDelete(id).then((res: ApiResponse) => {
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
