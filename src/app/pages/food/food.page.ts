import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { Food } from 'src/app/models';
import { Foods } from 'src/app/providers';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(-100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class FoodPage implements OnInit {

  records: Array<Food>;

  constructor(private router: Router,
    public foods: Foods,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    this.records = this.foods.query();
    console.log(this.records );
  }

  ngOnInit() {
    // this.getFoods();
  }

  searchRecord(ev) {
    const val = ev.target.value;
    if (!val || !val.trim()) {
      this.records = this.foods.query();
      return;
    }
    this.records = this.foods.query({
      name: val
    });
  }

}
