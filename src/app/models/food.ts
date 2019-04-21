﻿import { User } from './user';

export interface Food {
    id: string;
    type: string; // enum: ["DEFAULT", "CUSTOM"]
    category: string; // enum: ["FOOD", "DRINK"]
    name: string;
    description: string;
    ph: number;
    water: number;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
    vitamins: Array<string>;
    minerals: Array<string>;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
