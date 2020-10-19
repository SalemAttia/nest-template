import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../../controllers/auth.controller";
import { PasswordRestDto } from "../../dto/reset.password.dto";
import { PasswordRestTokenDto } from "../../dto/reset.password.token.dto";
import { SignInDto } from "../../dto/signin.dto";
import { SignUpDto } from "../../dto/signup.dto";
import { AuthService } from "../../services/auth.service";

jest.mock('../../services/auth.service');
describe('auth/controller/auth', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
       AuthService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create', () => {
      const request = new SignUpDto();
      jest.spyOn(service, 'signUp').mockImplementation(() => null);
      controller.create(request);
      expect(service.signUp).toHaveBeenCalledWith(request);
    });
  });

  describe('login', () => {
    it('should login', () => {
      const request = new SignInDto();
      jest.spyOn(service, 'signin').mockImplementation(() => null);
      controller.singIn(request);
      expect(service.signin).toHaveBeenCalledWith(request);
    });
  });

  describe('passwordToken', () => {
    it('should passwordToken', () => {
      const request = new PasswordRestTokenDto();
      request.email = 'email@email.com'
      jest.spyOn(service, 'getToken').mockImplementation(() => null);
      controller.passwordToken(request);
      expect(service.getToken).toHaveBeenCalledWith(request.email);
    });
  });

  describe('resetPassword', () => {
    it('should resetPassword', () => {
      const request = new PasswordRestDto();
      jest.spyOn(service, 'resetPassword').mockImplementation(() => null);
      controller.resetPassword(request);
      expect(service.resetPassword).toHaveBeenCalledWith(request);
    });
  });
});