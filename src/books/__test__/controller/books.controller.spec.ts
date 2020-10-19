import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { BooksController } from '../../controllers/books.controller';
import { BooksService } from '../../services/books.service';
import { User } from '../../../auth/model/user.model';
import { CreateBookDto } from '../../dto/create-book.dto';

jest.mock('../../services/books.service');
jest.mock('mongoose');

describe('books/controller/BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false })
    ],
      providers: [
        BooksService,
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all books', async () => {
    jest.spyOn(service, 'getAll').mockImplementation(() => null);
    await controller.getBook();
    expect(service.getAll).toBeCalled();
  });

  it('should get create books', async () => {
    jest.spyOn(service, 'create').mockImplementation(() => null);
    await controller.createBook(new User(), new CreateBookDto());
    expect(service.create).toBeCalled();
  });

  it('should get getTaskById', async () => {
    jest.spyOn(service, 'getbyId').mockImplementation(() => null);
    await controller.getTaskById('12');
    expect(service.getbyId).toBeCalled();
  });

  it('should updateBook', async () => {
    jest.spyOn(service, 'update').mockImplementation(() => null);
    await controller.updateBook('12', new User(), new CreateBookDto());
    expect(service.update).toBeCalled();
  });

  it('should get deleteBook', async () => {
    jest.spyOn(service, 'delete').mockImplementation(() => null);
    await controller.deleteBook('12',  new User());
    expect(service.delete).toBeCalled();
  });
});