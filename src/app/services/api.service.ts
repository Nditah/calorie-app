import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EnvService } from './env.service';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private storage: NativeStorage,
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
    return this.http.post(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFood(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/foods/${id}`;
    return this.http.put(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteFood(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/foods${id}`;
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
    return this.http.post(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFeedback(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/feedbacks/${id}`;
    return this.http.put(url, data, httpOptions).pipe(
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
    return this.http.post(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateExercise(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/exercises/${id}`;
    return this.http.put(url, data, httpOptions).pipe(
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

  postLog(data): Observable<any> {
    const url = `${this.env.API_URL}/logs`;
    return this.http.post(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateLog(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/logs/${id}`;
    return this.http.put(url, data, httpOptions).pipe(
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
}
