import { User } from './user';

export interface Notification {
    id: string;
    user: User;
    message: string;
    notification_status: string;
    created_by: User;
    created_at: Date;
    updated_by: User;
    updated_at: Date;
}
