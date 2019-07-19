import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Food, ApiResponse, User } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';


@Injectable()
export class Foods {

  foods: Food[];
  user: User;

  constructor(private env: EnvService,
    private apiService: ApiService,
    private authService: AuthService) {
    this.authService.isAuthenticated().then((user) => {
      if (user && hasProp(user, 'id')) {
        this.user = new User(user);
        const queryString = `?filter={"$or":[{"created_by":"${this.user.id}"},{"type":"DEFAULT"}]}`;
        this.recordRetrieve(queryString).then().catch(err => console.log(err));
      }
  }).catch(err => console.log(err.message));
}

  query(params?: any) {
    if (!params) {
      return this.foods;
    }
    return this.foods.filter((food) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = food[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return food;
            } else if (field === params[key]) {
              return food;
            }
          }
      }
      return null;
    });
  }

  add(record: Food) {
    this.foods.push(new Food(record));
  }

  delete(record: Food) {
    this.foods.splice(this.foods.indexOf(record), 1);
  }

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/foods${queryString}`;
      const proRes = this.apiService.getApi(url).pipe(
          map((res: ApiResponse) => {
              console.log(res);
              if (res.success && res.payload.length > 0) {
                  res.payload.forEach(element => {
                    this.foods = res.payload;
                  });
              } else {
                  throwError(res.message);
              }
              return res;
          }));
      return await proRes.toPromise();
  }

  async recordCreate(record: Food): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/foods`;
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

  async recordUpdate(record: Food, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/foods/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
          map((res: ApiResponse) => {
              if (res.success) {
                  this.delete(record);
                  this.add(res.payload);
              } else {
                  throwError(res.message);
              }
              return res;
          }));
      return await proRes.toPromise();
  }

  async recordDelete(record: Food): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/foods/${record.id}`;
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
