import { Inject } from "@nestjs/common";
import { Model } from 'mongoose';
import { PasswordRestModel } from "../model/password.reset.model";

export class ResetPasswordRepository {
    constructor(
        @Inject('RESET_PASSWORD_MODEL')
    private resetPasswordModel: Model<PasswordRestModel>,
    ) {

    }

    async findOne(code: string){
       return this.resetPasswordModel.findOne({ code }).exec();
    }

    async generatenewToken(email: string){
        const createdPassordCode = new this.resetPasswordModel({email, code: Math.floor((Math.random() * 1000000) + 1)});
        return createdPassordCode.save();
     }

    async delete(email: string){
        await this.resetPasswordModel.deleteOne({email }).exec();
        return true;
     }

}