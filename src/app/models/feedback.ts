import { User } from './user';

export interface Feedback {
    id: string;
    user: User;
    message: string;
    status: string;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
