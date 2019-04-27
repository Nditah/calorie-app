import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, Exercise } from 'src/app/models';
import { Exercises } from 'src/app/providers';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {

  record: Exercise;

  constructor(public api: ApiService,
    public exercises: Exercises,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    public router: Router) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.exercises.query({ id })[0];
      this.record = record || exercises.defaultRecord;
      console.log(record);

    }

  ngOnInit() {
    // this.getExercise();
  }

  async getExercise() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.api.getExercise(`?_id=${id}`).subscribe((res: ApiResponse) => {
      console.log(res);
      if (res.success) {
          this.record = res.payload[0];
        }
        loading.dismiss();
        // this.alertCtrl.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        // this.alertCtrl.presentToast(err.message);
      });
  }
  async delete(id) {
    const loading = await this.loadingCtrl.create({message: 'Deleting'});
    await loading.present();
    await this.api.deleteExercise(id).subscribe((res: ApiResponse) => {
      if (res.success) {
        // this.alertCtrl.presentToast('Operation successful');
      }
      loading.dismiss();
        // this.location.back();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }


 async deleteRecord(record) {

  const alert = await this.alertCtrl.create({
    message: `Do you want to delete this ${record.name} record?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // slidingItem.close();
        }
      },
      {
        text: 'Yes',
        handler: async () => {
          const loading = await this.loadingCtrl.create({
            message: 'Please wait...'
          });
          await loading.present();
          setTimeout( async () => {
            await loading.dismiss();
            await this.exercises.delete(record);
            const toast = await this.toastCtrl.create({
              message: 'You have deleted ' + record['name'] + ' successfully .',
              duration: 2000,
              position: 'top'
            });
            await toast.present();
          }, 1000);
        }
      }
    ]
  });
  alert.present();
}

}
