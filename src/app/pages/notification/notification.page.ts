import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, Notification } from 'src/app/models';
import { Notifications } from 'src/app/providers';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'], animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(-100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class NotificationPage implements OnInit {

  records: Array<Notification>;
  danger = 'flash';
  warning = 'warning';
  success = 'checkmark-circle';
  info = 'bulb';
  secondary = 'water';
  primary = 'restaurant';


  constructor(public notifications: Notifications,
    private alertService: AlertService,
    public loadingCtrl: LoadingController) {
      this.records = this.notifications.query();
    }

  ngOnInit() {
    // this.getNotifications();
  }

  async getNotifications() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.notifications.recordRetrieve('').then((res: ApiResponse) => {
        console.log(res);
        this.records = res.payload;
        loading.dismiss();
        this.alertService.presentToast(res.message);
      }).catch (err => {
        console.log(err);
        loading.dismiss();
        this.alertService.presentToast(err.message);
      });
  }
}