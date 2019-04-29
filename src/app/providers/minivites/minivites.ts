import { Injectable } from '@angular/core';
import { Minivite } from '../../models';
import table from './minivites-data';

@Injectable()
export class Minivites {

  minivites: Minivite[] = [];

  defaultRecord: Minivite = {
    id: '1',
    type: 'VITAMIN',
    category: 'FAT_BASED',
    symbol: 'C',
    name: 'Acorbic Acid',
    classification: '',
    source: '',
    use: '',
    description: 'Vitamin C is helpful for...',
    requirement: 2300,
    dri: null,
    unit: 'mg',
    image: 'assets/images/juice.jpg',
  };

  constructor() {
    const minivites = table;
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
  add(minivite: Minivite) {
    this.minivites.push(minivite);
  }

  delete(minivite: Minivite) {
    this.minivites.splice(this.minivites.indexOf(minivite), 1);
  }
}

// http://www.medic8.com/healthguide/articles/foodgroups.html
// https://www.webmd.com/food-recipes/guide/vitamins-and-minerals-good-food-sources
