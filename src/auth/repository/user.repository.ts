import * as bcrypt from 'bcrypt';
import { User } from "../model/user.model"
import { SignUpDto } from "../dto/signup.dto"
import { ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { SignInDto } from "../dto/signin.dto";
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create.user.dto';

export class UserRepository {
    constructor(
        @Inject('USER_MODEL')
    private userModel: Model<User>,
    ) {

    }

    async findOne(email: string){
       return this.userModel.findOne({ email }).exec();
    }

    async createUser(signupDto: SignUpDto): Promise<User> {
        
        const user = await this.findOne(signupDto.email)
        if(user) {
            throw new ConflictException('User Emai already exist');
        }
        const salt = await bcrypt.genSalt();
        signupDto.password = await this.hashPassword(signupDto.password, salt);

        const createUserDto: CreateUserDto = {
            ...signupDto,
            salt,
        };

        const createdCat = new this.userModel(createUserDto);
        return createdCat.save();
    }

    async signin(signInDto: SignInDto): Promise<User> {
        const {email, password} = signInDto;
        const user = await this.userModel.findOne({ email }).exec();
        if(user) {
            const isValid = await this.validatePassword(password, user.salt, user.password);
            if(isValid) {
                return user;
            }
            return null;
        }
        if(!user) {
            throw new NotFoundException('user not found');
        }
    }

    async validatePassword(password: string, salt: string, userPassword: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, salt);
        if(hash === userPassword) {
            return true;
        }
        return false;
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}