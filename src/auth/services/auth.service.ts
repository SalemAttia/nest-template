import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from '@nestjs/jwt'
import { SignUpDto } from '../dto/signup.dto';
import { User } from '../model/user.model';
import { SignInDto } from '../dto/signin.dto';
import { JwtPayload } from '../protocol/jwt-payload.interface';
import { ResetPasswordRepository } from '../repository/reset.password.repository';
import { PasswordRestDto } from '../dto/reset.password.dto';
import { PasswordRestModel } from '../model/password.reset.model';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private resetPasswordRepository: ResetPasswordRepository,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<User> {
        const user = await this.userRepository.createUser(signUpDto);
        return user;

    }

    async getToken(email: string): Promise<PasswordRestModel> {
        const user = await this.userRepository.findOne(email);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.resetPasswordRepository.generatenewToken(email)
    }

    async resetPassword(passwordRestDto: PasswordRestDto): Promise<boolean> {
        const passwordCode = await this.resetPasswordRepository.findOne(passwordRestDto.code);
        if (!passwordCode) {
            throw new NotFoundException('code is not correct');
        }
        const user = await this.userRepository.findOne(passwordCode.email);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        user.password = await this.userRepository.hashPassword(passwordRestDto.password, user.salt);
        await user.save();
        await this.resetPasswordRepository.delete(passwordCode.email);
        return true;
    }

    async signin(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.signin(signInDto);
        if (user) {
            const { email } = user;
            const payload: JwtPayload = { email };
            const token = await this.jwtService.sign(payload);
            return { accessToken: token }
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
