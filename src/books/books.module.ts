import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './services/books.service';
import { DatabaseModule } from '../database/database.module';
import { BookRepository } from './repository/book.repository';
import { booksProviders } from './providers/book.providers';

@Module({
  imports: [
    DatabaseModule, 
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    BookRepository,
    ...booksProviders
  ]
})
export class BooksModule {}
