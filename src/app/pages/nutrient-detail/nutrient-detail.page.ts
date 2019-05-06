import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Nutrient } from 'src/app/models';
import { Nutrients } from 'src/app/providers';

@Component({
  selector: 'app-nutrient-detail',
  templateUrl: './nutrient-detail.page.html',
  styleUrls: ['./nutrient-detail.page.scss'],
})
export class NutrientDetailPage implements OnInit {

  record: Nutrient;

  constructor(
    public nutrients: Nutrients,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    public router: Router) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.nutrients.query({ id })[0];
      this.record = record || nutrients.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
    //
  }

}
