import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user: User;

  constructor(private menu: MenuController, private authService: AuthService) { 
    this.menu.enable(true);
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.authService.getUser().then(user => {
        this.user = user;
      }
    );
  }
}
