import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Notification, ApiResponse, User } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';


@Injectable()
export class Notifications {

  notifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    user: null,
    message: 'You need to add more protein and vegetable in your diet.',
    status: 'read',
    created_at: new Date('2019-07-04'),
  },
  {
    id: '2',
    type: 'warning',
    user: null,
    message: 'You are adding weight. Please cut down on your fat and carbs intake.',
    status: 'unread',
    created_at: new Date('2019-06-04'),
  }
];
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

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const query = queryString || `${this.user.id}`;
      const url = `${this.env.API_URL}/notifications${queryString}`;
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

  async recordCreate(record: Notification): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/notifications`;
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
              } else {
                  throwError(res.message);
              }
              return res;
          }));
      return await proRes.toPromise();
  }

}
