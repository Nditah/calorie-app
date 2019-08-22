import { UnitService } from './../../services/unit.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.page.html',
  styleUrls: ['./log-detail.page.scss'],
})
export class LogDetailPage implements OnInit {

  record: any = {};

  constructor(
    public api: ApiService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public unit: UnitService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getLog();
  }

  async getLog() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.api.getLog(`?_id=${id}`).subscribe((res: ApiResponse) => {
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
      this.alertService.alert(
        'Delete!',
        'Press <strong>okay</strong> to delete.',
        () => {
          console.log('Delete Canceled!');
        },
        async () => {
          const loading = await this.loadingCtrl.create({message: 'Deleting'});
          await loading.present();
          await this.api.deleteLog(id).subscribe((res: ApiResponse) => {
            if (res.success) {
              this.alertService.presentToast('Operation successful');
            }
            loading.dismiss();
              this.router.navigateByUrl('/log');
            }, err => {
              console.log(err);
              loading.dismiss();
            });
        });
  }
}
