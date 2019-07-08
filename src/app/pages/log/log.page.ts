import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { ApiService, AlertService } from 'src/app/services';
import { ApiResponse, Log } from 'src/app/models';
import { Logs } from 'src/app/providers';


@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'], animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(-100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class LogPage implements OnInit {

  records: Array<Log>;

  constructor(public api: ApiService,
    public logs: Logs,
    public loadingCtrl: LoadingController) {
      this.records = this.logs.query();
    }

  ngOnInit() {
    // this.getLogs();
  }

  async getLogs() {
    const loading = await this.loadingCtrl.create({
      translucent: true,
      animated: true,
      message: 'Loading records...',
      duration: 5000
    });
    await loading.present();
    await this.logs.recordRetrieve('').then((res: ApiResponse) => {
        console.log(res);
        this.records = res.payload;
        loading.dismiss();
      });
  }
}
