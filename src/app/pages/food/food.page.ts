import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  foods: any;

  constructor(public api: ApiService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getFoods();
  }

  async getFoods() {
    const loading = await this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 5000
    });
    await loading.present();
    await this.api.getFood('').subscribe(res => {
        console.log(res);
        this.foods = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
