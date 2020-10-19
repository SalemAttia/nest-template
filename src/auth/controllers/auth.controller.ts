import { Controller, UsePipes, ValidationPipe, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/signup.dto';
import { User } from '../model/user.model';
import { SignInDto } from '../dto/signin.dto';
import { PasswordRestDto } from '../dto/reset.password.dto';
import { PasswordRestTokenDto } from '../dto/reset.password.token.dto';
import { PasswordRestModel } from '../model/password.reset.model';

@Controller('api/v1')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register') 
    @UsePipes(ValidationPipe)
    create(
        @Body(ValidationPipe) signUpDto: SignUpDto
    ): Promise<User> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login') 
    @UsePipes(ValidationPipe)
    singIn(
        @Body(ValidationPipe) signInDto: SignInDto
    ): Promise<{accessToken: string}> {
        return this.authService.signin(signInDto);
    }

    @Post('/password-token') 
    @UsePipes(ValidationPipe)
    passwordToken(
        @Body(ValidationPipe) passwordRestDto: PasswordRestTokenDto
    ): Promise<PasswordRestModel> {
        return this.authService.getToken(passwordRestDto.email);
    }

    @Post('/reset-password') 
    @UsePipes(ValidationPipe)
    resetPassword(
        @Body(ValidationPipe) passwordRestDto: PasswordRestDto
    ): Promise<boolean> {
        return this.authService.resetPassword(passwordRestDto);
    }
}
