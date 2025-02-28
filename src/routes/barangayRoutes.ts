import { Router } from 'express'

import { getBarangays } from '@src/controllers/v1/barangayController'
import catchAsync from '@src/utils/catchAsync'

const router : Router = Router()

router.get('/barangays/:city_code', catchAsync(getBarangays))

export { router as barangayRoutes }