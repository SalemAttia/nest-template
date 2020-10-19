import { Document } from 'mongoose';

export class PasswordRestModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt?: string;
}
