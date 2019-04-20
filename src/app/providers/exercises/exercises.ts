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
    image: 'assets/img/exercises/bear.jpg',
  };


  constructor() {
    const exercises = [
      {
        id: '12',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Soccer',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/cheetah.jpg',
      },
      {
        id: '13',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Handball',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/duck.jpg',
      },
      {
        id: '14',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Running',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/eagle.jpg',
      },
      {
        id: '15',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Swimming',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/elephant.jpg',
      },
      {
        id: '16',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Football',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/giraffe.jpg',
      },
      {
        id: '17',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Cycling',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/iguana.jpg',
      },
      {
        id: '18',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Jugging',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/kitten.jpg',
      },
      {
        id: '19',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Skipping',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/lion.jpg',
      },
      {
        id: '20',
        type: 'DEFAULT',
        category: 'SPORT',
        name: 'Pushups',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/mouse.jpg',
      },
      {
        id: '21',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Strething',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/puppy.jpg',
      },
      {
        id: '22',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Walking Fast',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/rabbit.jpg',
      },
      {
        id: '23',
        type: 'CUSTOM',
        category: 'SPORT',
        name: 'Jumping',
        description: 'Favourite sport for cutting down fats for teens and adults',
        calorie_rate: '2300',
        image: 'assets/img/exercises/turtle.jpg',
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
