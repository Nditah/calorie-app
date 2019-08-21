import { UnitService } from './../../services/unit.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';
import { Foods } from 'src/app/providers';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  record: any = {};

  constructor(
    public api: ApiService,
    public foods: Foods,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public unit: UnitService,
  ) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.foods.query({ id })[0];
      this.record = record || foods.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
    // this.getFood();
  }

  async getFood() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.api.getFood(`?_id=${id}`).subscribe((res: ApiResponse) => {
      console.log(id);
        if (res.success && res.payload.length > 0) {
          console.log(res.payload);
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
          await this.api.deleteFood(id).subscribe((res: ApiResponse) => {
            if (res.success) {
              this.alertService.presentToast('Operation successful');
            }
            loading.dismiss();
            // this.location.back();
          }, err => {
            console.log(err);
            loading.dismiss();
          });
        });
  }
}
