import { Connection } from 'mongoose';
import { BookSchema } from '../../database/schemas/book.schema';

export const booksProviders = [
  {
    provide: 'BOOK_MODEL',
    useFactory: (connection: Connection) => connection.model('Book', BookSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
