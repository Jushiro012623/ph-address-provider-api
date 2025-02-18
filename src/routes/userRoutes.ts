import { Router } from "express";
import { User } from "@src/controllers/v1/userController";
const router = Router();


router
.route('/admin/users')
.get(User.getAll)
.post(User.createOne)

router
.route('/admin/users/:id')
.get(User.getOne)
.patch(User.updateOne)
.delete(User.deleteOne);

export {router as UserRoutes}