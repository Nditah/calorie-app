import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse } from 'src/app/models';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {

  record: any = {};

  constructor(public api: ApiService,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router){ }

  ngOnInit() {
    this.getExercise();
  }

  async getExercise() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.api.getExercise(`?id=${id}`).subscribe((res: ApiResponse) => {
        if (res.success) {
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
    await this.api.deleteExercise(id).subscribe((res: ApiResponse) => {
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
}
