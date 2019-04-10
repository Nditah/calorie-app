import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  food: any = {};

  constructor(public api: ApiService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router){ }

  ngOnInit() {
    this.getFood();
  }

  async getFood() {
    const loading = await this.loadingCtrl.create({
      content: 'Loading...',
    });
    await loading.present();
    await this.api.getFood( '?id=' + this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.food = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  async delete(id) {
    const loading = await this.loadingCtrl.create({
      content: 'Deleting'
    });
    await loading.present();
    await this.api.deleteFood(id)
      .subscribe(res => {
        loading.dismiss();
        // this.location.back();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
