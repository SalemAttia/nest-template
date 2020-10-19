import { TestingModule, Test } from "@nestjs/testing";
import { User } from "../../../auth/model/user.model";
import { CreateBookDto } from "../../dto/create-book.dto";
import { Book } from "../../model/Book.model";
import { BookRepository } from "../../repository/book.repository";
import { BooksService } from "../../services/books.service";


jest.mock('mongoose');
jest.mock('../../repository/book.repository');

describe.only('auth/service/AuthService', () => {
  let repository: BookRepository;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        BookRepository,
      ],
    }).compile();

    repository = module.get<BookRepository>(BookRepository);
    service = module.get<BooksService>(BooksService);
  });

  describe('getAll', () => {
    it('getAll', async () => {
      jest
        .spyOn(repository, 'getAll')
        .mockImplementation(() => null);
      await service.getAll();
      expect(repository.getAll).toHaveBeenCalled();
    });
  });

  describe('getbyId', () => {
    it('getbyId', async () => {
      jest
        .spyOn(repository, 'getById')
        .mockImplementation(() => Promise.resolve(new Book()));
      await service.getbyId('id');
      expect(repository.getById).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('update', async () => {
      const user = new User();
      user._id = '1';

      const book = new Book();
      book.auther = user;
      
      jest
        .spyOn(service, 'getbyId')
        .mockImplementation(() => Promise.resolve(book));

        jest
        .spyOn(repository, 'update')
        .mockImplementation(() => null);
      await service.update('id', new CreateBookDto(), user);
      expect(service.getbyId).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('delete', async () => {
      const user = new User();
      user._id = '1';

      const book = new Book();
      book.auther = user;
      
      jest
        .spyOn(service, 'getbyId')
        .mockImplementation(() => Promise.resolve(book));

        jest
        .spyOn(repository, 'delete')
        .mockImplementation(() => null);
      await service.delete('id', user);
      expect(service.getbyId).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalled();
    });
  });
});
