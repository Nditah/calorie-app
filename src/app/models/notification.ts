import { User } from './user';

export class Notification {
    id?: string;
    type?: 'danger' | 'warning' | 'success' | 'info';
    user?: User;
    title?: string;
    message?: string;
    status?: 'read' | 'unread';
    deleted: boolean;
    created_by?: User;
    created_at?: Date;
    updated_by?: User;
    updated_at?: Date;

    constructor(fields?: any) {
        for (const f in fields) {
            this[f] = fields[f];
        }
    }
}

export interface Notification {
   // [prop?: string]?: any;
   id?: string;
   type?: 'danger' | 'warning' | 'success' | 'info';
   user?: User;
   title?: string;
   message?: string;
   status?: 'read' | 'unread';
   deleted: boolean;
   created_by?: User;
   created_at?: Date;
   updated_by?: User;
   updated_at?: Date;
}
