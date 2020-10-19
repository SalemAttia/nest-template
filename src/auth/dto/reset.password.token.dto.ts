import { IsNotEmpty, IsEmail } from 'class-validator'
export class PasswordRestTokenDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}