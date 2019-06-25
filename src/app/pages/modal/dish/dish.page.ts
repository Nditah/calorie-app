import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Foods, Logs, DishService } from '../../../providers';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})

export class DishPage {
  orders: Array<any>;
  totalVal = 0;

  @ViewChild('slidingList') slidingList: IonItemSliding;

  constructor(
    public navCtrl: NavController,
    public foodService: Foods,
    public logService: DishService,
    public route: Router,
    private modalCtrl: ModalController
  ) {
    this.getOrders();
  }

  async removeOrder (order) {
    this.logService.removefromDish(order)
      .then(() => {
          this.getOrders();
      })
      .catch(error => alert(JSON.stringify(error)));

    await this.slidingList.close().then((a) => {});
  }

  getOrders () {
    this.logService.getOrders().then(orders => {
      this.orders = orders;
      this.totalVal = 0;
      this.orders.forEach((val, i) => {
        this.totalVal = this.totalVal + (val.order.price * val.qtd);
      });
    });
  }

  // minus adult when click minus button
  minusQtd(order) {
    this.logService.editQtdOrder(order, 'minus')
      .then(() => {
          this.getOrders();
      })
      .catch(error => alert(JSON.stringify(error)));
  }

  // plus adult when click plus button
  plusQtd(order) {
    this.logService.editQtdOrder(order, 'plus')
      .then(() => {
          this.getOrders();
      })
      .catch(error => alert(JSON.stringify(error)));
  }

  openCheckout() {
    this.route.navigate(['checkout']);
    this.modalCtrl.dismiss();
    // this.navCtrl.navigateForward('checkout/');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
