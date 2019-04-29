import { User } from './user';

export class Minivite {
    id: string;
    type: string; // enum: ["sub", "main"]
    category: string; // enum: ["fat-based", "water-based", "macro-mineral", "trace-mineral", "carbohydrate"]
    name: string;
    symbol: string;
    classification: string; // [protein]
    source: string;
    use: string;
    description: string;
    dri?: number; // DRI (Dietary Reference Intake) grams per kilogram of body weight,
    requirement: number;
    unit: string;
    image: string;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;

    constructor(fields: any) {
// tslint:disable-next-line: forin
        for (const f in fields) {
            this[f] = fields[f];
        }
    }

}

export interface Minivite {
    [prop: string]: any;
}
