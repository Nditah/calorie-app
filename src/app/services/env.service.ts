import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // API_URL = 'https://calorie-api.herokuapp.com/api';
  API_URL = 'http://localhost:5000/api';
  adMobPubId = 'ca-app-pubz-9523247492220942/9437355526';
  adMobIntId = 'ca-app-pubz-9523247492220942/1862251283';

  constructor() { }
}
