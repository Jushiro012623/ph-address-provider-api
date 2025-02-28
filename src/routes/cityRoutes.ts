import { Router } from 'express'   

import { getCities } from '@src/controllers/v1/cityController'
import catchAsync from '@src/utils/catchAsync'

const router : Router = Router()

router.get('/cities/:province_code', catchAsync(getCities))

export { router as citiesRoutes }