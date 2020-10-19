import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwt-stratagy';
import { userProviders } from './providers/user.providers';
import { resetPasswordProviders } from './providers/reset.password.providers';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './repository/user.repository';
import { ResetPasswordRepository } from './repository/reset.password.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'stopsecret51',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserRepository,
    ResetPasswordRepository,
    ...userProviders,
    ...resetPasswordProviders
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
