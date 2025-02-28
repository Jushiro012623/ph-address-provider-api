import { Router } from 'express'   

import catchAsync from '@src/utils/catchAsync'
import { getProvinces } from '@src/controllers/v1/provinceController' 

const router : Router = Router()

router.get('/provinces/:region_code', catchAsync(getProvinces))

export { router as provinceRoutes }