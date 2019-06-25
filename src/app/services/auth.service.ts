import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { LoginResponse, ApiResponse, User } from '../models';
import { EnvService } from './env.service';
import { hasProp } from '../helpers';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  depth = 0;

  constructor(
    public storage: Storage,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public env: EnvService) {
    }

  cleanObject(obj) {
    this.depth += 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            if (this.depth <= 3) {
              this.cleanObject(obj[ propName ]);
            }
        }
    }
    return obj;
  }

  async userLogin(data): Promise<LoginResponse> {
    const payload = this.cleanObject(data);
    const response = this.http.post(this.env.API_URL + '/users/login', payload)
    .pipe(tap((res: LoginResponse) => {
        // console.log('auth.service: res =>', res);
      if (res.success) {
        // this.createToast(`Login successful`);
        const { user, token } = res.payload;
        this.storage.set('token', token).then(val => val);
        this.storage.set('user', user).then(val => val);
        this.isLoggedIn = true;
      } else {
        this.createToast(res.message);
        this.isLoggedIn = false;
      }
      }));
      return await response.toPromise();
  }

  async createToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  userCreate(data: any) {
    const payload = this.cleanObject(data);
    return this.http.post(this.env.API_URL + '/users', payload);
  }

  async userUpdate(data, id): Promise<LoginResponse> {
    const payload = this.cleanObject(data);
    const response = this.http.put(`${this.env.API_URL}/users/${id}`, payload)
    .pipe(tap((res: ApiResponse) => {
        // console.log('auth.service: res =>', res);
      if (res.success && res.payload) {
        // console.log(`Update successful`, res.payload);
        this.storage.set('user', res.payload).then(val => val);
      } else {
        // console.log(res.message);
      }
      }));
      return await response.toPromise();
  }

  async userLogout() {
    this.isLoggedIn = false;
    try {
      await this.storage.remove('user');
      await this.storage.remove('token');
    } catch (err) {
      throwError(err);
    }
  }

  async isAuthenticated(): Promise<any> {
    try {
      const user = await this.storage.get('user');
      // const token = await this.storage.get('token');
      if (user) {
          return JSON.parse(user);
      } else {
        console.log('user ==> ', user);
        return null;
      }
    } catch (err) {
      throw new Error('Error verifying authentication ' + err.message);
    }
  }

}
