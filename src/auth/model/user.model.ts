import { Document } from 'mongoose';

export class User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt?: string;
}
