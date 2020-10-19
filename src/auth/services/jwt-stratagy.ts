import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../protocol/jwt-payload.interface';
import { UserRepository } from '../repository/user.repository';
import { User } from '../model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'stopsecret51',
        })

    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user =  await this.userRepository.findOne(email);
        
        if(!user) {
            throw new UnauthorizedException();
        }
        
        return user;
    }

}