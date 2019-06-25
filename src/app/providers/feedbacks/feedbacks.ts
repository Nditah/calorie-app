import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Feedback, ApiResponse, User } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';


@Injectable()
export class Feedbacks {

  feedbacks: Feedback[] = [];
  user: User;

  constructor(private env: EnvService,
    private apiService: ApiService,
    private authService: AuthService) {
    this.authService.isAuthenticated().then(user => {
      this.user = user;
    });
    this.authService.isAuthenticated().then((user) => {
      if (user && hasProp(user, 'id')) {
        this.user = new User(user);
        const queryString = `?filter={"$or":[{"created_by":"${this.user.id}"},{"type":"DEFAULT"}]}`;
        this.recordRetrieve(queryString).then().catch(err => console.log(err));
      }
  }).catch(err => console.log(err));
}

  query(params?: any) {
    if (!params) {
      return this.feedbacks;
    }
    return this.feedbacks.filter((feedback) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = feedback[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return feedback;
            } else if (field === params[key]) {
              return feedback;
            }
          }
      }
      return null;
    });
  }

  add(record: Feedback) {
    this.feedbacks.push(new Feedback(record));
  }

  delete(record: Feedback) {
    this.feedbacks.splice(this.feedbacks.indexOf(record), 1);
  }

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const query = queryString || `${this.user.id}`;
      const url = `${this.env.API_URL}/feedbacks${queryString}`;
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

  async recordCreate(record: Feedback): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/feedbacks`;
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

  async recordUpdate(record: Feedback, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/feedbacks/${record.id}`;
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

  async recordDelete(record: Feedback): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/feedbacks/${record.id}`;
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
