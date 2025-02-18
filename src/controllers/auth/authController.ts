import jwtConfig from "@config/jwt.config";

import { HTTP_STATUS } from "@src/constants";
import { IUser } from "@src/types/userTypes";
import { AppError } from "@src/utils/appError";
import { IFindOptions, IRequest, TPasswordMatch, TToken } from "@src/types/authTypes";

import { compare } from "@utils/bcryptFunction";

import { NextFunction, Request, Response } from "express";
import { SignOptions } from "jsonwebtoken";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';

const { User } = require('../../models')

export const signIn = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {
    const { email, password } : Pick<IRequest, 'email' | 'password' > = req.body
    
    const userQuery : IFindOptions = { [Op.or] : [ {email}, { username: email} ]}
    const foundUser : IUser = await User.findOne({where : userQuery})
    if(!foundUser) return next(new AppError('User does not exists', HTTP_STATUS.NOT_FOUND));
    
    const isPasswordMatch : TPasswordMatch = await compare(password, foundUser.password)
    if(!isPasswordMatch) return next(new AppError('Invalid Credentials', HTTP_STATUS.UNAUTHORIZED));

    const accessToken : TToken = signToken({id : foundUser.id})
    res.status(HTTP_STATUS.OK).json({
        message: 'User signed-in in successfully',
        data : {
        accessToken,
            user: {
                id: foundUser.id,
                email: foundUser.email,
            }
        }
    })
    res.status(HTTP_STATUS.OK).json({
        message: 'User signed-in in successfully',
        data : {
        accessToken,
            user: {
                id: foundUser.id,
                email: foundUser.email,
            }
        }
    })
}
export const refreshToken = async (req: Request, res: Response, next : NextFunction) : Promise<void> => {
    const id = req.params.id
    const accessToken = signToken({id})
    res.status(HTTP_STATUS.OK).json({
        message: 'User signed-in in successfully',
        data : accessToken
    })
}
export const signToken = (payload : any) : TToken => {
    const tokenOptions : SignOptions = { expiresIn : jwtConfig.expiration };
    return jwt.sign(
        { payload },  
        jwtConfig.secret, 
        tokenOptions
    )
    
}
export const signOut = async (req: Request, res: Response, next : NextFunction) : Promise<void> => {
    res.status(HTTP_STATUS.OK).json({
        message: 'User signed-out successfully'
    })
}