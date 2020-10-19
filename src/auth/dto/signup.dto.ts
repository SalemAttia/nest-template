import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator'
export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    lastName: string;
    
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message : 'password should include number and char including at least one uppercase letter, one lower case letter'})
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}