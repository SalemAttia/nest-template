import { Document } from 'mongoose';
import { User } from '../../auth/model/user.model';
import { BookType } from '../protocol/book.type';

export class Book extends Document{
    title: string;
    description: string;
    cover: string;
    auther: User;
    createdAt: Date;
    updatedAt: Date;
    type: BookType;
}
