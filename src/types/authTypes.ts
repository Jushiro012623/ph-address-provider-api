import { Op } from "sequelize";
import { IUser } from "./userTypes";

export type TToken = string
export type TPasswordMatch = boolean
export type TPassword = string
export interface IPasswordResetToken {
    token: TToken;
    expiration : Date
    user_id : number | string
}
export interface IRequest{
    email : string;
    password : string;
    username : string;
    confirmPassword: string;
    token : string;
}

export interface IFindOptions { 
    [key: string]: { [Op.or]: Array<{ [key: string]: any }> 
    } 
}
