import { Injectable } from '@angular/core';

import { Exercise } from '../../models';

@Injectable()
export class Exercises {

  exercises: Exercise[] = [];

  defaultRecord: any = {
    id: '1',
    type: 'DEFAULT',
    category: 'SPORT',
    name: 'Football',
    description: 'Favourite sport for cutting down fats for teens and adults',
    calorie_rate: '2300',
    image: 'assets/images/football.png',
  };


  constructor() {
    const exercises = [];

    for (const exercise of exercises) {
      this.exercises.push(new Exercise(exercise));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.exercises;
    }
    return this.exercises.filter((exercise) => {
      for (const key in params) {
        const field = exercise[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return exercise;
        } else if (field == params[key]) {
          return exercise;
        }
      }
      return null;
    });
  }

  add(exercise: Exercise) {
    this.exercises.push(exercise);
  }

  delete(exercise: Exercise) {
    this.exercises.splice(this.exercises.indexOf(exercise), 1);
  }
}
