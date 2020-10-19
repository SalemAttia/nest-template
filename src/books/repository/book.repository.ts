import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../../auth/model/user.model";
import { CreateBookDto } from "../dto/create-book.dto";
import { Book } from "../model/Book.model";
import { BookType } from "../protocol/book.type";

export class BookRepository {
    constructor(
        @Inject('BOOK_MODEL')
    private bookModel: Model<Book>,
    ) {

    }

    async getAll(): Promise<any> {
        return this.bookModel.find({ type: BookType.PUBLICA }).populate('auther').exec();
    }

    async getById(id: string): Promise<Book> {
        return this.bookModel.findOne({ _id: id}).populate('auther').exec();
    }

    async create(createBookDto: CreateBookDto, user: User): Promise<any> {
        const createdCat = new this.bookModel(createBookDto);
        createdCat.auther = user;
        return createdCat.save();
    }

    async update(book: Book, body: any): Promise<any> {
        await book.updateOne(body).exec();
        return this.getById(book._id);
    }

    async delete(id: string): Promise<any> {
        await this.bookModel.deleteOne({ _id: id }).exec();
        return true;
    }

}