import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Notification, ApiResponse, User } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';


@Injectable()
export class Notifications {

  notifications: Notification[];
  user: User;

  constructor(private env: EnvService,
    private apiService: ApiService,
    private authService: AuthService) {
    this.authService.isAuthenticated().then((user) => {
      if (user && hasProp(user, 'id')) {
        this.user = new User(user);
        const queryString = `?filter={"$and":[{"user":"${this.user.id}"},{"deleted":"false"}]}`;
        this.recordRetrieve(queryString).then().catch(err => console.log(err));
      }
    }).catch(err => console.log(err.message));
  }

  query(params?: any) {
    if (!params) {
      return this.notifications;
    }
    return this.notifications.filter((notification) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = notification[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return notification;
            } else if (field === params[key]) {
              return notification;
            }
          }
      }
      return null;
    });
  }

  add(record: Notification) {
    this.notifications.push(new Notification(record));
  }

  delete(record: Notification) {
    this.notifications.splice(this.notifications.indexOf(record), 1);
  }

  async recordRetrieve(queryString): Promise<ApiResponse> {
      let query = `?filter={"$and":[{"user":"${this.user.id}"},{"deleted":"false"}]}`;
      query = queryString || query;
      const url = `${this.env.API_URL}/notifications${query}`;
      const proRes = this.apiService.getApi(url).pipe(
          map((res: ApiResponse) => {
              console.log(res);
              if (res.success && res.payload.length > 0) {
                  res.payload.forEach(element => {
                      this.notifications = res.payload;
                  });
              } else {
                  throwError(res.message);
              }
              return res;
          }));
      return await proRes.toPromise();
  }

  async recordUpdate(record: Notification, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/notifications/${record.id}`;
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

  async recordDelete(record: Notification): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/notifications/${record.id}`;
      const proRes = this.apiService.deleteApi(url).pipe(
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

}
