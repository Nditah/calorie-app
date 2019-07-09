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
  recordId: Nutrient['id'] = '';

  constructor(
    public nutrients: Nutrients,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router) {
      this.recordId = this.route.snapshot.paramMap.get('id');
      this.record = nutrients.query({ id: this.recordId })[0] || {};
    }

  ngOnInit() {
    //
  }

}
