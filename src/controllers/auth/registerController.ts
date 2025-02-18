import { HTTP_STATUS } from "@src/constants";

import { IUser } from "@src/types/userTypes";
import { IFindOptions, IRequest, TPassword } from "@src/types/authTypes"

import { NextFunction, Request, Response } from "express";
import { Op, Transaction } from "sequelize";

import { hash } from "@utils/bcryptFunction"
import { AppError } from "@src/utils/appError";


const db = require('../../models')
const { User } = require('../../models')

export const signUp = async(req : Request, res : Response, next : NextFunction): Promise<void> => {
    const { email, password, username } : Omit<IRequest, 'token' | 'confirmPassword'> = req.body
    const existingUserQuery : IFindOptions = { [Op.or] : [ {email},{username} ] }
    const existingUser : IUser = await User.findOne({where : existingUserQuery})
    
    if(existingUser){
        if(existingUser.username === username) {
            return next(new AppError('Username Already Taken', HTTP_STATUS.CONFLICT))
        }
        if(existingUser.email === email) {
            return next(new AppError('Email Already Taken', HTTP_STATUS.CONFLICT))
        }
    }
    const hashedPassword : TPassword  = await hash(password)
    
    const newUser : IUser = await db.sequelize.transaction(async ( transaction : Transaction ) => {
        return await User.create({email, password:hashedPassword, username}, { transaction })
    })
    
    res.status(HTTP_STATUS.CREATED)
    .json({
        message: 'User signed-up successfully',
        data : {
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username
            }
        }
    })

}