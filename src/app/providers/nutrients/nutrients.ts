import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Nutrient, ApiResponse, User } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';
import nutrientData from './nutrients-data';


@Injectable()
export class Nutrients {

  nutrients: any[] = nutrientData;
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
      return this.nutrients;
    }
    return this.nutrients.filter((nutrient) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = nutrient[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return nutrient;
            } else if (field === params[key]) {
              return nutrient;
            }
          }
      }
      return null;
    });
  }

  add(record: Nutrient) {
    this.nutrients.push(new Nutrient(record));
  }

  delete(record: Nutrient) {
    this.nutrients.splice(this.nutrients.indexOf(record), 1);
  }

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const query = queryString || `${this.user.id}`;
      const url = `${this.env.API_URL}/nutrients?${query}`;
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

  async recordCreate(record: Nutrient): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/nutrients`;
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

  async recordUpdate(record: Nutrient, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/nutrients/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
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

  async recordDelete(record: Nutrient): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/nutrients/${record.id}`;
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
