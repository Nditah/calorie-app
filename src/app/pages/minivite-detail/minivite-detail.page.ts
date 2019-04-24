import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services';
import { ApiResponse, Minivite } from 'src/app/models';
import { Minivites } from 'src/app/providers';

@Component({
  selector: 'app-minivite-detail',
  templateUrl: './minivite-detail.page.html',
  styleUrls: ['./minivite-detail.page.scss'],
})
export class MiniviteDetailPage implements OnInit {

  record: Minivite;

  constructor(public api: ApiService,
    public minivites: Minivites,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    public router: Router) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.minivites.query({ id })[0];
      this.record = record || minivites.defaultRecord;
      console.log(record);

    }

  ngOnInit() {
    // this.getMinivite();
  }

    /*
  async getMinivite() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.api.getMinivite(`?_id=${id}`).subscribe((res: ApiResponse) => {
      console.log(res);
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
  */

}
