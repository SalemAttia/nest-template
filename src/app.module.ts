import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';


@Module({
  imports: [
    BooksModule, AuthModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
