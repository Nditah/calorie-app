import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { AlertService } from 'src/app/services';
import { ApiResponse, Food } from 'src/app/models';
import { Foods, Logs, DailyService } from 'src/app/providers';
import { ImagePage } from './../modal/image/image.page';
import { DishPage } from './../modal/dish/dish.page';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  record: Food = {};
  recordId: Food['id'];
  quantity = 1;

  constructor(
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public dailyService: DailyService,
    public foods: Foods) {
      this.recordId = this.activatedRoute.snapshot.paramMap.get('id');
      this.record = this.foods.query({ id: this.recordId })[0];
    }

  ngOnInit() {
    // this.getFood();
  }

  async getFood() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.foods.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    const loading = await this.loadingCtrl.create({message: 'Deleting'});
    await loading.present();
    await this.foods.recordDelete(id).then((res: ApiResponse) => {
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


  // minus adult when click minus button
  minusQtd() {
    this.quantity--;
  }
  // plus adult when click plus button
  plusQtd() {
    this.quantity++;
  }

  addcart(dish, qtd) {
    this.dailyService.addtoDish(dish, qtd).then(async () => {
      const toast = await this.toastCtrl.create({
          message: 'Dish added to Dish',
          duration: 2000,
          position: 'top',
          closeButtonText: 'OK',
          showCloseButton: true
      });

      toast.present();
    });
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: DishPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

}
