import { Router } from 'express'   

import catchAsync from '@src/utils/catchAsync'
import { getCountries } from '@src/controllers/v1/countryController' 

const router : Router = Router()

router.get('/countries', catchAsync(getCountries))

export { router as countriesRoutes }