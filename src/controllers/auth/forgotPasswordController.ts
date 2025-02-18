import { HTTP_STATUS } from "@src/constants";

import { IUser } from "@src/types/userTypes";
import { IPasswordResetToken, IRequest, TPassword, TToken } from "@src/types/authTypes";

import nodemailer from "@src/services/nodemailer";

import crypto from 'crypto'
import { NextFunction, Response, Request } from "express";
import { SendMailOptions, SentMessageInfo, Transporter } from "nodemailer";

import baseUrl from "@src/utils/baseUrl";
import { AppError } from "@src/utils/appError";
import { compare, hash } from "@utils/bcryptFunction";

const { User, Password_Reset_Token } = require('../../models')

export const forgotPassword = async (req: Request, res: Response, next : NextFunction) : Promise<void> => {
    const { email } : Pick<IRequest, 'email'> = req.body;

    const userFound : IUser = await User.findOne({ email })
    if(!userFound) return next(new AppError('No user found', HTTP_STATUS.NOT_FOUND))

    const resetToken : TToken = crypto.randomBytes(20).toString('hex')
    const resetTokenExpiry : Date = new Date(Date.now() + 10 * 60 * 1000)
    const passwordResetTokenData : IPasswordResetToken = { token: resetToken, expiration: resetTokenExpiry, user_id: userFound.id} 
    await Password_Reset_Token.create(passwordResetTokenData)

    const transporter : Transporter = nodemailer.transporter()
    const mailOptions : SendMailOptions = nodemailer.mailOptions(userFound.email, resetToken)

    const sendMail : SentMessageInfo = await transporter.sendMail(mailOptions)
    console.log(`Message sent: 5s ${sendMail.messageId}`)

    res.status(HTTP_STATUS.OK).json({
        message: 'Reset password link sent to your email',
        data: {
            email: userFound.email,
            resetToken
        }
    })
}
export const resetPasswordLink = async (req: Request, res: Response, next : NextFunction) : Promise <void> => {
    const { token } : Partial<Pick<IRequest, 'token'>> = req.params;
    const findResetToken : IPasswordResetToken = await Password_Reset_Token.findOne({where: { token }});
    if(!findResetToken) return next(new AppError('Invalid or expired reset password link', HTTP_STATUS.NOT_FOUND))
    
    res.status(HTTP_STATUS.OK).send(`
        <form method="post" action="${baseUrl(req)}">
            <input type="hidden" name="token" value="${token}" />
            <input type="password" name="password" required placeholder="New Password" />
            <input type="submit" value="Reset Password" />
        </form>
    `);
}
export const resetPassword = async (req: Request, res: Response, next : NextFunction) : Promise<void> => {
    const { token, password } : IRequest = req.body
    
    const foundResetToken : IPasswordResetToken = await Password_Reset_Token.findOne({where: { token }});
    if(!foundResetToken) return next(new AppError('Invalid or expired reset password link', HTTP_STATUS.NOT_FOUND))
        
    const foundUser = await User.findOne({where : {id : foundResetToken.user_id}})
    if(!foundUser) return next(new AppError('User not found', HTTP_STATUS.NOT_FOUND))

    const isPasswordMatch = await compare(password, foundUser.password)
    if(isPasswordMatch) return next(new AppError('Password cannot be the same as the old password', HTTP_STATUS.CONFLICT))

    const hashedPassword : TPassword = await hash(password)
    await foundUser.update({password: hashedPassword})
    await Password_Reset_Token.destroy({where: {token}})

    res.status(HTTP_STATUS.OK).json({
        message: 'Password reset successfully'
    })

}