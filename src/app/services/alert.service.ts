import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController, private alertController: AlertController) { }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

  public async alert(header: string, message: string, cancel: () => void, okay: () => void) {
    const alert = await this.alertController.create({ header, message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: cancel
        }, {
          text: 'Okay',
          handler: okay
        }
      ]
    });

    await alert.present();
  }
}
