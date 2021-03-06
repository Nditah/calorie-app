import { Injectable } from '@angular/core';
import { Minivite } from '../../models';
import table from './minivites-data';

@Injectable()
export class Nutrients {

  nutrients: Minivite[] = [];

  defaultRecord: Minivite = {
    'id': '1',
    'name': 'Carbohydrates',
    'classification': 'carbohydrate',
    'category': 'carbohydrate',
    'type': 'MAIN',
    'symbol': 'Cm(H2O)n',
    'requirement': 130000,
    'limit': 325000,
    'unit': 'mg',
    'source': 'Carbohydrates constitute majority of foods like bread, noodles, rice, and other products that have grains.',
    'use': 'Main source of calorie intake',
    'description': `Carbohydrates are classified based on the number of monomer units in them or the number of sugar units they have. 
    They can be monosaccharides, disaccharides, or polysaccharides. Monosaccharides have one sugar unit, disaccharides have two sugar unites, 
    and polysaccharides have three or more sugar units.
    Monosaccharides and disaccharides are simpler carbohydrates while the polysaccharides are complex carbohydrates. 
    Complex carbohydrates take longer to digest because they need more time to be broken down into simpler sugar units. 
    Only the simpler sugar units can be absorbed by the blood.
    The spikes in the sugar levels of the blood are caused by too much consumption of simpler carbohydrates. 
    The simple carbohydrates are absorbed by the blood very quickly which causes the blood sugar levels to spike abnormally. 
    This leads to heart diseases and vascular diseases. You should keep in mind that there are a lot of foods out there that are composed of simple sugars. 
    One of them is the sugar-based juice.`,
    image: 'assets/images/junk.jpg',
  };

  constructor() {
    const minivites = table;
    for (const minivite of minivites) {
      this.nutrients.push(new Minivite(minivite));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.nutrients;
    }
    return this.nutrients.filter((minivite) => {
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
    this.nutrients.push(minivite);
  }

  delete(minivite: Minivite) {
    this.nutrients.splice(this.nutrients.indexOf(minivite), 1);
  }
}

// http://www.medic8.com/healthguide/articles/foodgroups.html
// https://www.webmd.com/food-recipes/guide/vitamins-and-minerals-good-food-sources
