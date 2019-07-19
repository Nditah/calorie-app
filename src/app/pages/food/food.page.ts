import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { Food, ApiResponse } from 'src/app/models';
import { Foods } from 'src/app/providers';
import { AlertService } from 'src/app/services';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(-100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class FoodPage implements OnInit {

  records: Array<Food>;

  constructor(private router: Router,
    public foods: Foods,
    private alertService: AlertService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {
    // this.records = this.foods.query();
  }

  ngOnInit() {
    this.getFoods();
  }


  async getFoods() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    try {
      const res: ApiResponse = await this.foods.recordRetrieve('');
      if (res.success && res.payload.length > 0) {
          this.records = res.payload;
      } else {
        this.alertService.presentToast(res.message);
      }
      loading.dismiss();
    } catch (err) {
        console.log(err);
        // this.alertService.presentToast(err.message);
      }
  }

  searchRecord(ev) {
    const val = ev.target.value;
    if (!val || !val.trim()) {
      this.records = this.foods.query();
      return;
    }
    this.records = this.foods.query({
      name: val
    });
  }

}
