import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EnvService } from './env.service';

import { OfflineManagerService } from './offline-manager.service';
import { NetworkService, ConnectionStatus } from './network.service';
import { Log } from '../models';

const API_STORAGE_KEY = 'specialkey';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  depth = 0;

  constructor(private http: HttpClient,
    private networkService: NetworkService,
    private storage: Storage,
    private offlineManager: OfflineManagerService,
    private nativeStorage: NativeStorage,
    private env: EnvService,
    private router: Router,
    private toastController: ToastController) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
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

  updateUser(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/users/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------FOOD-----------------//
  // /////////////////////////////////

  getFood(path): Observable<any> {
    const url = `${this.env.API_URL}/foods${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postFood(data): Observable<any> {
    const url = `${this.env.API_URL}/foods`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFood(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/foods/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteFood(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/foods/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------FEEDBACK-----------------//
  // /////////////////////////////////

  getFeedback(path): Observable<any> {
    const url = `${this.env.API_URL}/feedbacks${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postFeedback(data): Observable<any> {
    const url = `${this.env.API_URL}/feedbacks`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFeedback(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/feedbacks/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteFeedback(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/feedbacks/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------EXERCISE-------------//
  // /////////////////////////////////

  getExercise(path): Observable<any> {
    const url = `${this.env.API_URL}/exercises${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postExercise(data): Observable<any> {
    const url = `${this.env.API_URL}/exercises`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateExercise(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/exercises/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteExercise(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/exercises/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------LOG-------------//
  // /////////////////////////////////

  getLog(path): Observable<any> {
    const url = `${this.env.API_URL}/logs${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postLog(data: Log): Observable<any> {
    const url = `${this.env.API_URL}/logs`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateLog(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/logs/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteLog(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/logs/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------SETTING-------------//
  // /////////////////////////////////

  getSetting(path): Observable<any> {
    const url = `${this.env.API_URL}/settings${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // /////////////////////////////////
  // ----------IMAGE-------------//
  // /////////////////////////////////

  postImage(data): Observable<any> {
    const url = `${this.env.API_URL}/images`;
    return this.http.post(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------MINIVITES-------------//
  // /////////////////////////////////

  getMinivite(path): Observable<any> {
    const url = `${this.env.API_URL}/minivites${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}
