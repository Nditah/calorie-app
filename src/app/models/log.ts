import { User } from './user';
import { Food } from './food';
import { Exercise } from './exercise';

export interface Log {
    id: string;
    day: Date;
    food: Food;
    food_quantity: number;
    exercise: Exercise;
    exercise_duration: number;
    remark: string;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
