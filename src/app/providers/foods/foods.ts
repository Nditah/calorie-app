import { Injectable } from '@angular/core';
import { Food } from '../../models';

@Injectable()
export class Foods {

  foods: Food[] = [];

  defaultRecord: Food = {
    id: '1',
    type: 'DEFAULT',
    category: 'FOOD',
    name: 'Bread',
    description: 'Wheat bread enrich with vitamins A,B,C',
    calories: 2300,
    image: 'assets/img/bread.jpg',
  };


  constructor() {
    const foods: Array<Food> = [
      {
        id: '12',
        type: 'DEFAULT',
        category: 'FOOD',
        name: 'Salad',
        description: 'Fruit Salad',
        calories: 2300,
        image: 'assets/img/salad.png',
      },
      {
        id: '13',
        type: 'DEFAULT',
        category: 'DRINK',
        name: 'Water',
        description: 'Pure water',
        calories: 2300,
        image: 'assets/img/water.jpg',
      },
      {
        id: '14',
        type: 'DEFAULT',
        category: 'DRINK',
        name: 'Juice',
        description: 'Assorted blend of fresh fruit juice',
        calories: 2300,
        image: 'assets/img/juice.jpg',
      },
      {
        id: '16',
        type: 'DEFAULT',
        category: 'FOOD',
        name: 'Sardin',
        description: 'Sardin Fish',
        calories: 2300,
        image: 'assets/img/sardin.jpg',
      },
      {
        id: '17',
        type: 'DEFAULT',
        category: 'FOOD',
        name: 'Rice and Stew',
        description: 'Rice and tomatoe stew',
        calories: 2300,
        image: 'assets/img/rice.jpg',
      },
      {
        id: '18',
        type: 'CUSTOM',
        category: 'FOOD',
        name: 'Pasta',
        description: 'Spaghetti and Noddles',
        calories: 2300,
        image: 'assets/img/pasta.jpg',
      },
      {
        id: '19',
        type: 'CUSTOM',
        category: 'DRINK',
        name: 'Whisky',
        description: 'Strong drink like wine, whisky',
        calories: 2300,
        image: 'assets/img/whisky.png',
      },
      {
        id: '20',
        type: 'DEFAULT',
        category: 'DRINK',
        name: 'Carbonated drinks',
        description: 'Carbonated sweet drinks',
        calories: 2300,
        image: 'assets/img/drinks.jpg',
      },
      {
        id: '21',
        type: 'CUSTOM',
        category: 'FOOD',
        name: 'Junk',
        description: 'Wheat junk food: buns, fishroll, doughnuts, chin-chin',
        calories: 2300,
        image: 'assets/img/junk.jpg',
      },
      {
        id: '22',
        type: 'CUSTOM',
        category: 'FOOD',
        name: 'Yam porrage',
        description: 'Yam mixed in vegetable soup',
        calories: 2300,
        image: 'assets/img/yams.jpg',
      },
      {
        id: '23',
        type: 'CUSTOM',
        category: 'FOOD',
        name: 'fufu and soup',
        description: 'Fufu and vegetable soup: santa, towo',
        calories: 2300,
        image: 'assets/img/fufu.jpg',
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
