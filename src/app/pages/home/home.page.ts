import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goToPage(urlString: string) {
    this.navCtrl.navigateRoot(`/${urlString}`)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
}
