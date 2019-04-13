import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { LoginResponse, User } from '../models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token = null;
  depth = 0;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
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

  login(data) {
    const payload = this.cleanObject(data);
    console.log('auth.service: payload =>', payload);
    return this.http.post(this.env.API_URL + '/users/login', payload)
    .pipe(tap((response: LoginResponse) => {
        console.log('auth.service: response =>', response);
        const { user, token } = response.payload;
      /*
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
        */
        this.token = token;
        this.isLoggedIn = true;
        return response;
      }),
    );
  }

  register(data: any) {
    const payload = this.cleanObject(data);
    return this.http.post(this.env.API_URL + '/users', payload);
  }

  logout(): Promise<any> {
    this.isLoggedIn = false;
    delete this.token;
    return this.storage.remove('token');
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
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

  public async getToken(): Promise<any> {
    try {
      const token = await this.storage.getItem('token');
      if (token != null) {
        this.token = token;
        this.isLoggedIn = true;
      } else {
        this.token = null;
        this.isLoggedIn = false;
      }
      return token;
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
      return null;
    }
  }
}
