import { Injectable } from '@angular/core';
import { Food, ApiResponse } from '../../models';
import { ApiService, AlertService } from 'src/app/services';

@Injectable()
export class Foods {

  foods: Food[] = [];

  defaultRecord: Food = {
    id: '1',
    type: 'DEFAULT',
    category: 'FOOD',
    name: 'Bread',
    description: 'Whole wheat bread with added vitamins and minerals',
    water: 0.4,
    calories: 23400,
    carbohydrate: 2345,
    protein: 2500,
    fats: 230.0,
    fibre: 3570,
    minivites: [{ minivite_id: '5cbb581b42b32d642a7c32f5', minivite_value: 120 }],
    image: 'assets/images/junk.jpg',
  };


  constructor(public api: ApiService) {
    const foods: Array<Food> = [
        {
          id: '2',
          type: 'DEFAULT',
          category: 'FOOD',
          name: 'Junk',
          description: 'Buns, bread, fries are all junk food',
          water: 0.4,
          calories: 234,
          carbohydrate: 2345,
          protein: 4950,
          fats: 23.0,
          fibre: 3570,
          minivites: [{ minivite_id: '5cbb581b42b32d642a7c32f5', minivite_value: 120 }],
          image: 'assets/images/junk.jpg',
      }
    ];

    for (const food of foods) {
      this.foods.push(new Food(food));
    }

    this.getFoods();
  }

  query(params?: any) {
    if (!params) {
      return this.foods;
    }
    return this.foods.filter((food) => {
      for (const key in params) {
        const field = food[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return food;
        } else if (field == params[key]) {
          return food;
        }
      }
      return null;
    });
  }

  add(food: Food) {
    this.foods.push(food);
  }

  delete(food: Food) {
    this.foods.splice(this.foods.indexOf(food), 1);
  }

  async getFoods() {
    await this.api.getFood('').subscribe((res: ApiResponse) => {
      if (res.success && res.payload.length > 0) {
          const foods = res.payload.map((record, index) => {
            const obj = Object.assign({}, record);
            obj.image = this.api.getImageUrl(record.image);
            return obj;
          });
          for (const food of foods) {
            this.foods.push(new Food(food));
          }
        }
      }, err => {
        console.log(err);
      });
  }
}
