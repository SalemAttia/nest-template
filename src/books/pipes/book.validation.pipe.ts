import { PipeTransform, BadRequestException } from "@nestjs/common";
import { BookType } from "../protocol/book.type";

export class BookValidationPipe implements PipeTransform {
    readonly ALLOWED_STATUS = [
        BookType.PRIVATE,
        BookType.PUBLICA,
    ];

    transform(value: any) {
        if(!this.isValid(value)) {
            throw new BadRequestException(`value ${value} not valid`);
        }
        return value;
    }

    isValid(status: any): boolean {
        const id = this.ALLOWED_STATUS.indexOf(status);

        return id !== -1;
    }
    
}