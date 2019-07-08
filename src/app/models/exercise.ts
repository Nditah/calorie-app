import { User } from './user';

export class Exercise {
    id?: string;
    type?: 'DEFAULT'|'CUSTOM';
    category?: 'SPORT' | 'WORKOUT';
    name?: string;
    description?: string;
    calorie_rate?: number;
    tasks: string;
    images?: Array<string>;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;

    constructor(fields?: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Exercise {
    id?: string;
    type?: 'DEFAULT'|'CUSTOM';
    category?: 'SPORT' | 'WORKOUT';
    name?: string;
    description?: string;
    calorie_rate?: number;
    tasks: string;
    images?: Array<string>;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;
}
