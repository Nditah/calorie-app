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
  currentTab = 'FOOD';

  constructor(private router: Router,
    public api: ApiService,
    public foods: Foods,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    this.currentRecords = this.foods.query();
  }

  ngOnInit() {
    this.currentRecords = this.foods.query();
    this.reloadRecords();
  }

  reloadRecords() {
    setTimeout(() => {
      if (this.currentRecords.length <= 1) {
        this.segmentChanged.call(this);
        this.reloadRecords();
      }
    }, 1000);
  }

  searchRecord(ev) {
    const val = ev ? ev.target.value : null;
    if (!val || !val.trim()) {
      this.currentRecords = this.foods.query({
        category: this.currentTab,
      });
      return;
    }
    this.currentRecords = this.foods.query({
      name: val,
    });
    this.currentRecords = this.currentRecords.filter(rec => rec.category === this.currentTab);
  }

  segmentChanged(ev: CustomEvent) {
    this.currentTab = ev ? ev.detail.value : this.currentTab;
    this.searchRecord.call(this);
  }

}
