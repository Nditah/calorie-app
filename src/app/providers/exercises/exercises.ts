import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Exercise, ApiResponse, User } from '../../models';
import { ApiService, EnvService, AuthService } from '../../services';
import { hasProp } from 'src/app/helpers';


@Injectable()
export class Exercises {

  exercises: Exercise[] = [
    {
    id: '1',
    type: 'DEFAULT',
    category: 'SPORT',
    name: '400M Sprint',
    description: 'Short distance fast running',
    calorie_rate: 234,
    tasks: 'Running',
    images: ['assets/img/dishes/dish01.jpg', 'assets/img/dishes/dish02.jpg'],
  },
  {
      id: '2',
      type: 'CUSTOM',
      category: 'WORKOUT',
      name: 'Hide and Seek',
      description: 'Run and hide while another searches for you.',
      calorie_rate: 234,
      tasks: 'Run, Squart',
      images: ['assets/img/dishes/dish03.jpg', 'assets/img/dishes/dish04.jpg'],
  }];
  user: User;


  constructor(private env: EnvService,
    private apiService: ApiService,
    private authService: AuthService) {
    this.authService.isAuthenticated().then(user => {
      this.user = user;
      if (user && hasProp(user, 'id')) {
        this.user = new User(user);
        const queryString = `?filter={"$or":[{"created_by":"${this.user.id}"},{"type":"DEFAULT"}]}`;
        this.recordRetrieve(queryString).then().catch(err => console.log(err));
      }
    }).catch(err => console.log(err.message));
  }

  query(params?: any) {
    if (!params) {
      return this.exercises;
    }
    return this.exercises.filter((exercise) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = exercise[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return exercise;
            } else if (field === params[key]) {
              return exercise;
            }
          }
      }
      return null;
    });
  }

  add(record: Exercise) {
    this.exercises.push(new Exercise(record));
  }

  delete(record: Exercise) {
    this.exercises.splice(this.exercises.indexOf(record), 1);
  }

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
      const query = queryString || `${this.user.id}`;
      const url = `${this.env.API_URL}/exercises${queryString}`;
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

  async recordCreate(record: Exercise): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/exercises`;
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

  async recordUpdate(record: Exercise, payload): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/exercises/${record.id}`;
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

  async recordDelete(record: Exercise): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/exercises/${record.id}`;
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