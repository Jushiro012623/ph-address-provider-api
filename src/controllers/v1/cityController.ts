import { NextFunction , Response, Request } from "express";

import { HTTP_STATUS } from "@src/constants";
import { ICity } from "@src/types/cityTypes";
import { AppError } from "@src/utils/appError";

const { City } = require('../../models')

export const getCities = async ( req : Request, res : Response,  next : NextFunction ) : Promise<void> => {
    const { province_code } : Partial<Pick<ICity, 'province_code' >> = req.params
    
    if (!province_code) {
        return next(new AppError('Province Code is required', HTTP_STATUS.BAD_REQUEST));
    }
     const cities : Pick<ICity, 'city_code' | 'city_name'> = await City.findAll({
        where : { province_code },
        attributes: ['city_code', 'city_name']
    });

    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Cities Retrieved Successfully',
        data: cities
    });
}
