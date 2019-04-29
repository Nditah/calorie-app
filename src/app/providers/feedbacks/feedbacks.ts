import { Injectable } from '@angular/core';
import { Feedback } from '../../models';

@Injectable()
export class Feedbacks {

  feedbacks: Feedback[] = [];

  defaultRecord: Feedback = {
    id: '1',
    message: 'Vitamin C is helpful for...',
    status: 'read',
  };

  constructor() {
    const feedbacks = [
      {
        id: '2',
        message: 'Drink enough fresh water and take your Vit C.',
        status: 'unread',
      }
    ];

    for (const feedback of feedbacks) {
      this.feedbacks.push(new Feedback(feedback));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.feedbacks;
    }
    return this.feedbacks.filter((feedback) => {
      for (const key in params) {
        const field = feedback[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return feedback;
        } else if (field == params[key]) {
          return feedback;
        }
      }
      return null;
    });
  }

  delete(feedback: Feedback) {
    this.feedbacks.splice(this.feedbacks.indexOf(feedback), 1);
  }
}
