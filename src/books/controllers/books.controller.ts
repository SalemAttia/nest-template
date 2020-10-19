import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBookDto } from '../dto/create-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../auth/model/user.model';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { Book } from '../model/Book.model';

@ApiBearerAuth()
@Controller('api/v1/book')
export class BooksController {

    private logger = new Logger('BooksController');

    constructor(private bookService: BooksService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Get all books.', type: '' })
    @ApiResponse({ status: 401, description: 'Unauthorized user.', type: Error })
    async getBook(
        ): Promise<Book[]> {
        return this.bookService.getAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 201, description: 'create book.', type: '' })
    @ApiResponse({ status: 401, description: 'Unauthorized user.', type: Error })
    async createBook(
        @GetUser() user: User,
        @Body(ValidationPipe) createTaskDto: CreateBookDto
        ): Promise<Book> {
        return this.bookService.create(createTaskDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
        ): Promise<Book> {
        return this.bookService.getbyId(id)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard('jwt'))
    updateBook(
        @Param('id') id: string,
        @GetUser() user: User,
        @Body(ValidationPipe) body: CreateBookDto) : Promise<Book> {
        return this.bookService.update(id, body, user);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    deleteBook(
        @Param('id') id: string,
        @GetUser() user: User,
        ): Promise<boolean> {
        return this.bookService.delete(id, user);
    }
    
}