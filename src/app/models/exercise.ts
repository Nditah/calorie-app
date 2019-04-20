import { Food } from './food';
import { User } from './user';

export class Exercise {
    id: string;
    type: string; // ["DEFAULT", "CUSTOM"]
    category: string; // enum: ["SPORT", "WORKOUT"]
    name: string;
    description: string;
    calorie_rate: number;
    image?: string;
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

export interface Exercise {
    [prop: string]: any;
}
