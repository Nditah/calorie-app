import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Log, Food, User, ApiResponse, Exercise } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';


@Injectable()
export class Logs {

  logs: Log[] = [];
  user: User;

  food: Food =     {
    id: '1',
    type: 'DEFAULT',
    category: 'FOOD',
    name: 'Chicken',
    description: 'Roasted rice',
    water: 0.4,
    calories: 234,
    carbohydrate: 2345,
    protein: 4950,
    fats: 23.0,
    fibre: 3570,
    ingredients: ['Spices', 'Vegetable'],
    nutrients: [{ nutrient_id: '5cc74ee9b27a5b01bd016185', nutrient_value: 120 }],
    images: ['assets/img/dishes/dish01.jpg', 'assets/img/dishes/dish02.jpg'],
};

  exercise: Exercise = {
    id: '2',
    type: 'CUSTOM',
    category: 'WORKOUT',
    name: 'Hide and Seek',
    description: 'Run and hide while another searches for you.',
    calorie_rate: 234,
    tasks: ['Run', 'Squart'],
    images: ['assets/img/exercises/exercise01.jpg', 'assets/img/exercises/exercise02jpg'],
};

  logData: Array<Log> = [{
    id: '1',
    day: new Date(),
    food: this.food,
    food_quantity: 1200,
    exercise: this.exercise,
    exercise_duration: 20,
    current_mass: 97,
    remark: 'Making progress',
  }];

  constructor(private env: EnvService,
    private apiService: ApiService,
    private authService: AuthService) {
    const logs = this.logData; // [] Initial Values
    for (const log of logs) {
      this.logs.push(new Log(log));
    }
    this.authService.isAuthenticated().then((user) => {
      if (user && hasProp(user, 'id')) {
        this.user = new User(user);
        const queryString = `?created_by=${this.user.id}&sort=-created_at`;
        this.recordRetrieve(queryString).then().catch(err => console.log(err));
      }
    }).catch(err => console.log(err.message));
  }

query(params?: any) {
  if (!params) {
    return this.logs;
  }
  return this.logs.filter((record) => {
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const field = record[key];
          if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
            return record;
          } else if (field === params[key]) {
            return record;
          }
        }
    }
    return null;
  });
}

add(record: Log) {
  this.logs.push( new Log(record));
}

  delete(log: Log) {
    this.logs.splice(this.logs.indexOf(log), 1);
  }

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/logs${queryString}`;
    const proRes = this.apiService.getApi(url).pipe(
        map((res: ApiResponse) => {
            console.log(res);
            if (res.success && res.payload.length > 0) {
                res.payload.forEach(element => {
                    this.logs = res.payload;
                });
            } else {
                throwError(res.message);
            }
            return res;
        }));
    return await proRes.toPromise();
  }

  async recordCreate(record: Log): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/logs`;
    const proRes = this.apiService.postApi(url, record).pipe(
        map((res: ApiResponse) => {
            if (res.success && res.payload) {
                console.log('recordCreate() successful');
                this.add(res.payload);
            } else {
                throwError(res.message);
            }
            return res;
        }));
    return await proRes.toPromise();
}

async recordDelete(record: Log): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/logs/${record.id}`;
    const proRes = this.apiService.deleteApi(url).pipe(
        map((res: ApiResponse) => {
            if (res.success) {
                this.delete(record);
            } else {
                throwError(res.message);
            }
            return res;
        }));
    return await proRes.toPromise();
  }
}

