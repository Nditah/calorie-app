import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Minivite } from 'src/app/models';
import { Nutrients } from 'src/app/providers';


@Component({
  selector: 'app-minivite',
  templateUrl: './minivite.page.html',
  styleUrls: ['./minivite.page.scss'],
})
export class MinivitePage implements OnInit {

  currentRecords: Array<Minivite>;

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
  }

}
