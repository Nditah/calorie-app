import { Injectable } from '@angular/core';
import { Minivite } from '../../models';

@Injectable()
export class Minivites {

  minivites: Minivite[] = [];

  defaultRecord: Minivite = {
    id: '1',
    type: 'VITAMIN',
    category: 'FAT_BASED',
    symbol: 'C',
    name: 'Acorbic Acid',
    description: 'Vitamin C is helpful for...',
    requirement: 2300,
    unit: 'miligram',
    image: 'assets/img/minivites/bear.jpg',
  };

  constructor() {
    const minivites = [
      {
          id: '2',
          type: 'VITAMIN',
          category: 'FAT_BASED',
          symbol: 'C',
          name: 'Acorbic Acid',
          description: 'Vitamin C is helpful for...',
          requirement: 2300,
          unit: 'miligram',
          image: 'assets/img/minivites/lion.jpg',
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
          image: 'assets/img/minivites/kitten.jpg',
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
          image: 'assets/img/minivites/eagle.jpg',
        },
  ];

    for (const minivite of minivites) {
      this.minivites.push(new Minivite(minivite));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.minivites;
    }
    return this.minivites.filter((minivite) => {
      for (const key in params) {
        const field = minivite[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return minivite;
        } else if (field == params[key]) {
          return minivite;
        }
      }
      return null;
    });
  }

}
