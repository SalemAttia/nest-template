import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { BookType } from '../protocol/book.type';

export class CreateBookDto {

    @ApiProperty()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    cover: string;

    @ApiProperty()
    @IsNotEmpty()
    type: BookType;
}