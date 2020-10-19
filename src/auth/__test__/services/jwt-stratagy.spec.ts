import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from '../../services/jwt-stratagy';
import { UserRepository } from '../../repository/user.repository';
import { User } from '../../model/user.model';

const mockUser = new User();

jest.mock('mongoose');
jest.mock('../../repository/user.repository');

describe.only('auth/service/Jwt', () => {
  let userRepository: UserRepository;
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          JwtStrategy,
          UserRepository
        ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate', () => {
        it('validate user', async() => {
          jest.spyOn(userRepository, 'findOne').mockImplementation(() => Promise.resolve(mockUser))
            const result = await jwtStrategy.validate({ email: 'test@email.com' });
            expect(userRepository.findOne).toHaveBeenCalledWith('test@email.com');
            expect(result).toEqual(mockUser);
        });

        it('should throw error', async() => {
            userRepository.findOne = jest.fn(() => null);
            expect(jwtStrategy.validate({ email: 'test@email.com' })).rejects.toThrow(UnauthorizedException);
            expect(userRepository.findOne).toHaveBeenCalledWith('test@email.com');

        });
    });

});
