import { Router } from "express";

import catchAsync from "@src/utils/catchAsync";
import { signIn, signOut } from "@src/controllers/auth/authController";
import { signUp } from "@src/controllers/auth/registerController";
import { forgotPassword, resetPassword, resetPasswordLink } from "@src/controllers/auth/forgotPasswordController";
const router = Router()

router.post('/signin', catchAsync(signIn))
router.post('/signup', catchAsync(signUp))
router.post('/signout', catchAsync(signOut))
router.post('/forgot-password', catchAsync(forgotPassword))
router.get('/reset-password/:token', catchAsync(resetPasswordLink))
router.post('/reset-password', catchAsync(resetPassword))

export {router as AuthRoutes}