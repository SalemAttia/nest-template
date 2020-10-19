import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../repository/user.repository';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordRepository } from '../../repository/reset.password.repository';
import { SignUpDto } from '../../dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordRestDto } from '../../dto/reset.password.dto';
import { PasswordRestModel } from '../../model/password.reset.model';
import { SignInDto } from '../../dto/signin.dto';

const mockUser = new User();

jest.mock('mongoose');
jest.mock('../../repository/user.repository');
jest.mock('../../repository/reset.password.repository');
jest.mock('@nestjs/jwt');

describe.only('auth/service/AuthService', () => {
  let userRepository: UserRepository;
  let resetPasswordRepository: ResetPasswordRepository;
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserRepository,
        ResetPasswordRepository,
        JwtService,
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    resetPasswordRepository = module.get<ResetPasswordRepository>(ResetPasswordRepository);
    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signUp', () => {
    it('signUp', async () => {
      jest
        .spyOn(userRepository, 'createUser')
        .mockImplementation(() => Promise.resolve(mockUser));
      const request = new SignUpDto();
      await service.signUp(request);
      expect(userRepository.createUser).toHaveBeenCalledWith(request);
    });
  });

  describe('getToken', () => {
    it('getToken', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockUser));
        jest
        .spyOn(resetPasswordRepository, 'generatenewToken')
        .mockImplementation(() => null);
      const request = 'email@email.com';
      await service.getToken(request);
      expect(userRepository.findOne).toHaveBeenCalledWith(request);
      expect(resetPasswordRepository.generatenewToken).toHaveBeenCalledWith(request);
    });
  });

  describe('resetPassword', () => {
    it('resetPassword', async () => {
      mockUser.save = jest.fn();
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockUser));
        jest
        .spyOn(userRepository, 'hashPassword')
        .mockImplementation(() => Promise.resolve('pass-hashed'));
        jest
        .spyOn(resetPasswordRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(new PasswordRestModel()));

        jest
        .spyOn(resetPasswordRepository, 'delete')
        .mockImplementation(() => null);
      const request = new PasswordRestDto();
      request.code = 'any';
      const result = await service.resetPassword(request);
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(userRepository.hashPassword).toHaveBeenCalled();
      expect(resetPasswordRepository.findOne).toHaveBeenCalled();
      expect(resetPasswordRepository.delete).toHaveBeenCalled();
      expect(result).toEqual(true);
    });
  });

  describe('signin', () => {
    it('signin', async () => {
      jest
        .spyOn(userRepository, 'signin')
        .mockImplementation(() => Promise.resolve(mockUser));
        jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(() => null);
      const request = new SignInDto();
      await service.signin(request);
      expect(userRepository.signin).toHaveBeenCalledWith(request);
      expect(jwtService.sign).toHaveBeenCalled();
    });
  });
});
