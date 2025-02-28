import { NextFunction , Response, Request } from "express";

import { HTTP_STATUS } from "@src/constants";
import { IBarangay } from "@src/types/barangayTypes";
import { AppError } from "@src/utils/appError";

const { Barangay } = require('../../models')

export const getBarangays = async ( req : Request, res : Response,  next : NextFunction ) : Promise<void> => {
    const { city_code } : Partial<Pick<IBarangay, 'city_code'>> = req.params
    
    if (!city_code) {
        return next(new AppError('City Code is required', HTTP_STATUS.BAD_REQUEST));
    }
     const barangays : Pick<IBarangay,'brgy_code' | 'brgy_name'> = await Barangay.findAll({
        where : { city_code },
        attributes: ['brgy_code', 'brgy_name']
    });

    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Barangays Retrieved Successfully',
        data: barangays
    });
}
