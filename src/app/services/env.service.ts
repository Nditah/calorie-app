import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // API_URL = 'https://calorie-api.herokuapp.com/api';
  API_URL = 'http://localhost:5000/api';

  constructor() { }
}
