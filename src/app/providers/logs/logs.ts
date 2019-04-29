import { Injectable } from '@angular/core';
import { Log, Food } from '../../models';

@Injectable()
export class Logs {

  logs: Log[] = [];

  food: Food = {
    id: '1',
    type: 'DEFAULT',
    category: 'FOOD',
    name: 'Bread',
    description: 'Wheat bread enrich with vitamins A,B,C',
    calories: 2300,
    image: 'assets/img/bread.jpg',
  };

  exercise: any = {
    id: '1',
    type: 'DEFAULT',
    category: 'SPORT',
    name: 'Football',
    description: 'Favourite sport for cutting down fats for teens and adults',
    calorie_rate: '2300',
    image: 'assets/img/football.png',
  };

  defaultRecord: Log = {
    id: '1',
    day: new Date(),
    food: this.food,
    food_quantity: 1200,
    exercise: this.exercise,
    exercise_duration: 20,
    current_mass: 97,
    remark: 'Making progress',
  };

  constructor() {
    const logs = [];

    for (const log of logs) {
      this.logs.push(new Log(log));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.logs;
    }
    return this.logs.filter((log) => {
      for (const key in params) {
        const field = log[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return log;
        } else if (field == params[key]) {
          return log;
        }
      }
      return null;
    });
  }

  delete(log: Log) {
    this.logs.splice(this.logs.indexOf(log), 1);
  }
}
