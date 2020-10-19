import { IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator'
export class PasswordRestDto {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message : 'password should include number and char including at least one uppercase letter, one lower case letter'})
    password: string;
}