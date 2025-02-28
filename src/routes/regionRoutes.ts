import { Router } from 'express'   

import catchAsync from '@src/utils/catchAsync'
import { getRegions } from '@src/controllers/v1/regionController' 

const router : Router = Router()

router.get('/regions', catchAsync(getRegions))

export { router as regionsRoutes }