import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, Food } from 'src/app/models';
import { Foods } from 'src/app/providers';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  currentRecords: Array<Food>;

  constructor(private router: Router,
    public api: ApiService,
    private alertService: AlertService,
    public foods: Foods,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    this.currentRecords = this.foods.query();
  }

  ngOnInit() {
    this.getFoods();
  }

  searchRecord(ev) {
    const val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentRecords = this.foods.query();
      return;
    }
    this.currentRecords = this.foods.query({
      name: val
    });
  }

  async getFoods() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.api.getFood('').subscribe((res: ApiResponse) => {
      if (res.success && res.payload.length > 0) {
          const result = res.payload.map((record, index) => {
            const obj = Object.assign({}, record);
            obj.image = this.api.getImageUrl(record.image);
            return obj;
          });
          this.currentRecords = result;
        }
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
      });
  }
}
