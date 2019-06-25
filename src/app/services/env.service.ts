import { Injectable } from '@angular/core';

@Injectable()
export class EnvService {
  adMobPubId = '';
  adMobIntId = '';
  // API_URL = 'https://calorie-api.herokuapp.com/api';
  API_URL = 'http://0.0.0.0:5000/api';

  constructor() { }
}
