import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Nutrient } from 'src/app/models';
import { Nutrients } from 'src/app/providers';


@Component({
  selector: 'app-nutrient',
  templateUrl: './nutrient.page.html',
  styleUrls: ['./nutrient.page.scss'],
})
export class NutrientPage implements OnInit {

  currentRecords: Array<Nutrient>;

  constructor(
    public nutrients: Nutrients,
    public loadingCtrl: LoadingController) {

    this.currentRecords = this.nutrients.query();
  }

  searchRecord(ev) {
    const val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentRecords = this.nutrients.query();
      return;
    }
    this.currentRecords = this.nutrients.query({
      name: val
    });
  }

  ngOnInit() {
    //
  }

}
