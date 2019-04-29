import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Minivite } from 'src/app/models';
import { Minivites } from 'src/app/providers';

@Component({
  selector: 'app-minivite-detail',
  templateUrl: './minivite-detail.page.html',
  styleUrls: ['./minivite-detail.page.scss'],
})
export class MiniviteDetailPage implements OnInit {

  record: Minivite;

  constructor(
    public minivites: Minivites,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    public router: Router) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.minivites.query({ id })[0];
      this.record = record || minivites.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
    //
  }

}
