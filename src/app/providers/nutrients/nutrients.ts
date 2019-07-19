import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Nutrient, ApiResponse, User } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';


@Injectable()
export class Nutrients {

  nutrients: Array<Nutrient>;
  user: User;


  constructor(private env: EnvService,
    private apiService: ApiService,
    private authService: AuthService) {
    this.authService.isAuthenticated().then((user) => {
      if (user && hasProp(user, 'id')) {
        this.user = new User(user);
        this.recordRetrieve().then().catch(err => console.log(err));
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

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/nutrients?${queryString}`;
      const proRes = this.apiService.getApi(url).pipe(
          map((res: ApiResponse) => {
              console.log(res);
              if (res.success && res.payload.length > 0) {
                  this.nutrients = res.payload;
              } else {
                  throwError(res.message);
              }
              return res;
          }));
      return await proRes.toPromise();
  }

}
