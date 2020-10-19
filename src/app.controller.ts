import { Controller, Get, HttpStatus, Logger } from '@nestjs/common';


@Controller('health-check')
export class AppController {

    private logger = new Logger('BooksController');

    @Get('/')
    deleteTask(
        ): any {
        return {
            status: HttpStatus.OK,
            massege: 'its working'
        };
    }
}
