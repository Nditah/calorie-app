import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { AlertService } from 'src/app/services';
import { ApiResponse, Exercise } from 'src/app/models';
import { Exercises } from 'src/app/providers';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'], animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(-100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class ExercisePage implements OnInit {

  records: Array<Exercise>;
  public press = 0;

  constructor(private router: Router,
    private alertService: AlertService,
    private alertCtrl: AlertController,
    public exercises: Exercises,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {
    // this.records = this.exercises.query();
  }

  /**
   * Perform a service for the proper exercises.
   */
  searchRecord(ev) {
    const val = ev.target.value;
    if (!val || !val.trim()) {
      this.records = this.exercises.query();
      return;
    }
    this.records = this.exercises.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this exercise.
   */
  openRecord(exercise: Exercise) {
    this.router.navigate([`/exercise-detail/${exercise.id}`]);
    // this.router.navigate([`/exercise-detail`, { exercise }]);
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
    try {
      const res: ApiResponse = await this.exercises.recordRetrieve('');
      if (res.success && res.payload.length > 0) {
          this.records = res.payload;
      } else {
        console.log(res.message);
      }
      loading.dismiss();
    } catch (err) {
        console.log(err);
        // this.alertService.presentToast(err.message);
      }
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
