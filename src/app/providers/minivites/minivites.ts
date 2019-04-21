import { Injectable } from '@angular/core';

import { Minivite } from '../../models';

@Injectable()
export class Minivites {

  exercises: Minivite[] = [];

  defaultRecord: Minivite = {
    id: '1',
    type: 'VITAMIN',
    category: 'FAT_BASED',
    symbol: 'C',
    name: 'Acorbic Acid',
    description: 'Vitamin C is helpful for...',
    requirement: 2300,
    unit: 'miligram',
    image: 'assets/img/exercises/bear.jpg',
  };

  constructor() {
    const exercises = [
      {
          id: '2',
          type: 'VITAMIN',
          category: 'FAT_BASED',
          symbol: 'C',
          name: 'Acorbic Acid',
          description: 'Vitamin C is helpful for...',
          requirement: 2300,
          unit: 'miligram',
          image: 'assets/img/exercises/lion.jpg',
        },
      {
          id: '3',
          type: 'MINERAL',
          category: 'MACRO',
          symbol: 'Zn',
          name: 'Zinc',
          description: 'Zinc is helful for',
          requirement: 2300,
          unit: 'microgram',
          image: 'assets/img/exercises/kitten.jpg',
        },
      {
          id: '4',
          type: 'MINERAL',
          category: 'MACRO',
          symbol: 'Fe',
          name: 'Iron',
          description: 'Iron is helful for making haemoglobin in blood cells.',
          requirement: 2300,
          unit: 'ui',
          image: 'assets/img/exercises/eagle.jpg',
        },
  ];

    for (const exercise of exercises) {
      this.exercises.push(new Minivite(exercise));
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

}
