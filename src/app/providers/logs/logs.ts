import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Log, Food, User, ApiResponse } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';


@Injectable()
export class Logs {

  logs: Log[] = [];
  user: User;

  food: Food = {
    id: '1',
    type: 'DEFAULT',
    category: 'FOOD',
    name: 'Bread',
    description: 'Wheat bread enrich with vitamins A,B,C',
    calories: 2300,
    images: ['assets/img/bread.jpg'],
  };

  exercise: any = {
    id: '1',
    type: 'DEFAULT',
    category: 'SPORT',
    name: 'Football',
    description: 'Favourite sport for cutting down fats for teens and adults',
    calorie_rate: '2300',
    images: ['assets/img/football.png'],
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

  constructor(private env: EnvService,
    private apiService: ApiService,
    private authService: AuthService) {
    const logs = []; // [] Initial Values
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
                    this.add(element);
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

