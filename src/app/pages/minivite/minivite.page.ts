import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, Minivite } from 'src/app/models';
import { Minivites } from 'src/app/providers';


@Component({
  selector: 'app-minivite',
  templateUrl: './minivite.page.html',
  styleUrls: ['./minivite.page.scss'],
})
export class MinivitePage implements OnInit {

  currentRecords: Array<Minivite>;
  public press = 0;

  constructor(private router: Router,
    public api: ApiService,
    private alertService: AlertService,
    public minivites: Minivites,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    this.currentRecords = this.minivites.query();

  }

  searchMinivite(ev) {
    const val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentRecords = this.minivites.query();
      return;
    }
    this.currentRecords = this.minivites.query({
      name: val
    });
  }

  ngOnInit() {
    // this.getMinivites();
  }

  async getMinivites() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.api.getMinivite('').subscribe((res: ApiResponse) => {
        console.log(res);
        this.currentRecords = res.payload;
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
      });
  }

}
