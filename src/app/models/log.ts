import { User } from './user';
import { Food } from './food';
import { Exercise } from './exercise';

export class Log {
    id: string;
    day: Date;
    food: Food;
    food_quantity: number;
    exercise: Exercise;
    exercise_duration: number;
    current_mass: number;
    remark: string;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }
}

export interface Log {
    [prop: string]: any;
}
