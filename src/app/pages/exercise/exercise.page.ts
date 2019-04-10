import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  page = 'Exercise';
  records: any;

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getExercises();
  }

  async getExercises() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.api.getExercise('').subscribe((res: ApiResponse) => {
        console.log(res);
        this.records = res.payload;
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
      });
  }
}
