import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, Exercise } from 'src/app/models';
import { Exercises } from 'src/app/providers';
import { ExerciseAddPage } from '../exercise-add/exercise-add.page';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  currentRecords: Array<Exercise>;
  public press = 0;

  constructor(private router: Router,
    public api: ApiService,
    private alertService: AlertService,
    private alertCtrl: AlertController,
    public exercises: Exercises,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private vibration: Vibration) {

    this.currentRecords = this.exercises.query();
  }

  /**
   * Perform a service for the proper exercises.
   */
  searchRecord(ev) {
    const val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentRecords = this.exercises.query();
      return;
    }
    this.currentRecords = this.exercises.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this exercise.
   */
  openRecord(exercise: Exercise) {
    // this.router.navigate([`/exercise-detail/${exercise.id}`]);
    this.router.navigate([`/exercise-detail/1`, { exercise }]);
  }


  async addRecord() {
    const addModal = await this.modalCtrl.create({ component: 'ExerciseAddPage'});
    const { data } = await addModal.onDidDismiss();
    if (data) {
      console.log('exercise', data);
      this.exercises.add(data);
    }
    return await addModal.present();
  }

  async pressEvent(ev) {
    this.press++;
    this.vibration.vibrate(150);
    const toast = await this.toastCtrl.create({
      message: 'please slide to get the options .',
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }



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
      if (res.success && res.payload.length > 0) {
        const result = res.payload.map((record, index) => {
          const obj = Object.assign({}, record);
          obj.image = this.api.getImageUrl(record.image);
          return obj;
        });
        this.currentRecords = result;
        }
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
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
