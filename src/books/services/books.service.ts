import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../model/Book.model';
import { CreateBookDto } from '../dto/create-book.dto';
import { User } from '../../auth/model/user.model';
import { BookRepository } from '../repository/book.repository';

@Injectable()
export class BooksService {
    constructor(
        private bookRepository: BookRepository) {
    }

    async getAll(): Promise<Book[]> {
        const tasks = await this.bookRepository.getAll();
        return tasks;
    }

    async getbyId(id: string): Promise<Book> {
        const book = await this.bookRepository.getById(id);
        if(!book) {
            throw new NotFoundException('Book Not  Found');
        }
        return book;
    }

    async create(createTaskDto: CreateBookDto, user: User): Promise<Book> {
        return this.bookRepository.create(createTaskDto, user);
    }

    async update(id: string, body: CreateBookDto, user: User): Promise<Book> {
        const book = await this.getbyId(id);
        const userId = user._id;
        const autherId = book.auther._id;
        if(autherId.toString() !== userId.toString()) {
           throw new ForbiddenException('You Can not update this book') 
        }
        return this.bookRepository.update(book, body);
    }

    async delete(id: string, user: User): Promise<boolean> {
        const book = await this.getbyId(id);
        const userId = user._id;
        const autherId = book.auther._id;
        if(autherId.toString() !== userId.toString()) {
            throw new ForbiddenException('You Can not delete this book') 
         }

        await this.bookRepository.delete(id);
        
        return true;
    } 
}
