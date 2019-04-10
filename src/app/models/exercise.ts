import { Food } from './food';
import { User } from './user';

export interface Exercise {
    id: string;
    type: string; // ["DEFAULT", "CUSTOM"]
    category: string; // enum: ["SPORT", "WORKOUT"]
    name: string;
    description: string;
    calorie: number;
    duration: number;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
