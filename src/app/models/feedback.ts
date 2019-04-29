import { User } from './user';

export class Feedback {
    id: string;
    user?: User;
    message: string;
    status: string;
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

export interface Feedback {
    [prop: string]: any;
}
