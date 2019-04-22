import { Injectable } from '@angular/core';
import { Food } from '../../models';

@Injectable()
export class Foods {

  foods: Food[] = [];

  defaultRecord: Food = {
    id: '1',
    type: 'DEFAULT',
    category: 'SPORT',
    name: 'Football',
    description: 'Favourite sport for cutting down fats for teens and adults',
    calories: 2300,
    image: 'assets/img/foods/bear.jpg',
  };


  constructor() {
    const foods: Array<Food> = [
      {
        id: '12',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Soccer',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/cheetah.jpg',
      },
      {
        id: '13',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Handball',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/duck.jpg',
      },
      {
        id: '14',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Running',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/eagle.jpg',
      },
      {
        id: '15',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Swimming',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/elephant.jpg',
      },
      {
        id: '16',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Football',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/giraffe.jpg',
      },
      {
        id: '17',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Cycling',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/iguana.jpg',
      },
      {
        id: '18',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Jugging',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/kitten.jpg',
      },
      {
        id: '19',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Skipping',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/lion.jpg',
      },
      {
        id: '20',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Pushups',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/mouse.jpg',
      },
      {
        id: '21',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Strething',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/puppy.jpg',
      },
      {
        id: '22',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Walking Fast',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/rabbit.jpg',
      },
      {
        id: '23',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Jumping',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calories: 2300,
        image: 'assets/img/foods/turtle.jpg',
      },
    ];

    for (const food of foods) {
      this.foods.push(new Food(food));
    }
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
}
