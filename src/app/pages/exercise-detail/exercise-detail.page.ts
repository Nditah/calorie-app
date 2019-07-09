import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse, Exercise } from 'src/app/models';
import { Exercises, DailyService } from 'src/app/providers';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {

  record: Exercise;
  recordId: Exercise['id'];
  duration = 1;

  constructor(
    public exercises: Exercises,
    public dailyService: DailyService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router) {
      this.recordId = this.route.snapshot.paramMap.get('id');
      this.record = exercises.query({ id: this.recordId })[0] || {};
    }

  ngOnInit() {
    // this.getExercise();
  }

  async getExercise() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({message: 'Loading...'});
    await loading.present();
    await this.exercises.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
  async delete(record) {
    const loading = await this.loadingCtrl.create({message: 'Deleting'});
    await loading.present();
    await this.exercises.recordDelete(record).then((res: ApiResponse) => {
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


  // minus adult when click minus button
  minusQtd() {
    this.duration--;
  }
  // plus adult when click plus button
  plusQtd() {
    this.duration++;
  }

  addcart(dish, qtd) {
    this.dailyService.addtoDish(dish, qtd).then(async () => {
      const toast = await this.toastCtrl.create({
          message: 'Dish added to Dish',
          duration: 2000,
          position: 'top',
          closeButtonText: 'OK',
          showCloseButton: true
      });
      toast.present();
    });
  }
}
