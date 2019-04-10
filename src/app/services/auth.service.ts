import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EnvService } from './env.service';
import { LoginResponse, User } from '../models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: any;
  depth = 0;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private router: Router,
  ) { }

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

  login(payload) {
    return this.http.post(this.env.API_URL + '/users/login', this.cleanObject(payload))
    .pipe(tap((data: LoginResponse) => {
        const { user, token } = data.payload;
        this.storage.setItem('user', user).then(() => {
          console.log('User Stored');
        },
        error => console.error('Error storing item user', error)
      );
        this.storage.setItem('token', token).then(() => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item token', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return data;
      }),
    );
  }

  register(payload: any) {
    return this.http.post(this.env.API_URL + '/users', this.cleanObject(payload));
  }

  logout() {
    this.storage.remove('token');
    this.isLoggedIn = false;
    delete this.token;
    return null;
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(tap(user => {
        return user;
      })
    );
  }

  getUser() {
    return this.storage.getItem('user').then(data => data).catch(e => null);
  }

  async getToken() {
    try {
      const token = await this.storage.getItem('token');
      this.token = token;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        return token;
    } catch (e) {
      this.token = null;
      this.isLoggedIn = false;
      return null;
    }
  }
}
