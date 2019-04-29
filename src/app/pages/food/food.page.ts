import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services';
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
    public foods: Foods,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    this.currentRecords = this.foods.query();
    console.log(this.currentRecords );
  }

  ngOnInit() {
    // this.getFoods();
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

}
