import { UnitService } from './../../services/unit.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Minivite } from 'src/app/models';
import { Nutrients } from 'src/app/providers';

@Component({
  selector: 'app-minivite-detail',
  templateUrl: './minivite-detail.page.html',
  styleUrls: ['./minivite-detail.page.scss'],
})
export class MiniviteDetailPage implements OnInit {

  record: Minivite;

  constructor(
    public nutrients: Nutrients,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    public unit: UnitService,
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
