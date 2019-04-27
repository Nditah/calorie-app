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
    image: 'assets/img/football.png',
  };


  constructor() {
    const exercises = [
      {
        id: '12',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Fitness',
        description: 'Assorted fitness exercies for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/fitness.jpg',
      },
      {
        id: '13',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Handball',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/handball.png',
      },
      {
        id: '14',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Running',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/running.jpg',
      },
      {
        id: '15',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Swimming',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/swimming.jpg',
      },
      {
        id: '16',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Weight Lifting',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/weight-lift.jpg',
      },
      {
        id: '17',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Cycling',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/ridding.jpg',
      },
      {
        id: '18',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Jugging',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/jugging.jpg',
      },
      {
        id: '19',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Trekking',
        description: 'Trekking sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/trendmill.jpg',
      },
      {
        id: '20',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Pushups',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/pushup.jpg',
      },
    ];

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
