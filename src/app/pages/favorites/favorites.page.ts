import { Component, ViewChild } from '@angular/core';
import { NavController, IonItemSliding } from '@ionic/angular';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { Food, Exercise, User, ApiResponse } from 'src/app/models';
import { AuthService } from './../../services';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class FavoritesPage {
  favorites: Array<any>;

  @ViewChild('slidingList') slidingList: IonItemSliding;

  user: User;
  favoriteFoods: Array<Food> = [];
  customFoods: Array<Food> = [];
  favoriteExercises: Array<Exercise> = [];
  customExercises: Array<Exercise> = [];

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
  ) {
    authService.isAuthenticated().then((user: User) => {
      if (!!user) {
        this.user = user;
        this.favoriteFoods = user.favorite_foods ? user.favorite_foods : [];
        this.customFoods = user.custom_foods ? user.custom_foods : [];
        this.favoriteExercises = user.favorite_exercises ? user.favorite_exercises : [];
        this.customExercises = user.custom_exercises ? user.custom_exercises : [];
      }
    }).catch(err => console.log(err.message));
  }

  itemTapped(record, item) {
    if (item === 'food') {
      this.navCtrl.navigateForward('food-detail/' + record.id);
    } else {
      this.navCtrl.navigateForward('exercise-detail/' + record.id);
    }
  }

  async deleteItem(record, item) {
    let field: any;
    if (item === 'food') {
      field = 'favourite_foods';
    } else {
      field = 'favourite_exercises';
    }
    const payload = {}; // yet to be define.
      this.authService.userUpdate(payload, this.user.id)
      .then((data: ApiResponse) => {
          console.log(data.message);
      })
      .catch(error => alert(JSON.stringify(error)));

    await this.slidingList.close().then((a) => {
      console.log(a);
    });
  }

}
