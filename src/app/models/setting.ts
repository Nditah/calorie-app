import { User } from './user';

export interface Setting {
    id: string;
    name: string;
    access: string;
    value: string;
    category: string;
    description: string;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
