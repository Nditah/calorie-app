import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { Nutrient } from 'src/app/models';
import { Nutrients } from 'src/app/providers';


@Component({
  selector: 'app-nutrient',
  templateUrl: './nutrient.page.html',
  styleUrls: ['./nutrient.page.scss'], animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(-100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class NutrientPage implements OnInit {

  records: Array<Nutrient>;
  description = `
  Most of the foods that you consume are made up of several of the classes of nutrients. 
  Some of the nutrients are needed by the body all the time while the others are needed once in awhile. 
  People’s health deteriorates because of the imbalance of nutrients.
  There can be too much of a nutrient or a deficiency in it.`;

  constructor(
    public nutrients: Nutrients,
    public loadingCtrl: LoadingController) {
    this.records = this.nutrients.query();
  }

  searchRecord(ev) {
    const val = ev.target.value;
    if (!val || !val.trim()) {
      this.records = this.nutrients.query();
      return;
    }
    this.records = this.nutrients.query({
      name: val
    });
  }

  ngOnInit() {
    //
  }

}
