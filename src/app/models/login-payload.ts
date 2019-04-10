export class LoginPayload {
    email: string;
    phone: string;
    password: string;
}

export enum LoginType {
    EMAIL= 'EMAIL',
    PHONE= 'PHONE',
    OTP= 'OTP',
}
