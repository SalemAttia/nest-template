import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from 'class-validator'
export class SignInDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(20)
    email: string;
    
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

}