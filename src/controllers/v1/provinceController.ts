import { NextFunction , Response, Request } from "express";

import { HTTP_STATUS } from "@src/constants";
import { IProvince } from "@src/types/provinceTypes";
import { AppError } from "@src/utils/appError";
const { Province } = require('../../models')


export const getProvinces = async ( req : Request, res : Response,  next : NextFunction ) : Promise<void> => {
    const { region_code } : Partial<Pick<IProvince, 'region_code'>> = req.params
    
    if (!region_code) {
        return next(new AppError('Region Code is Required', HTTP_STATUS.BAD_REQUEST));
    }
     const province  : Pick<IProvince, 'province_code' | 'province_name'> = await Province.findAll({
        where : { region_code },
        attributes: ['province_code', 'province_name']
    });

    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Province Retrieved Successfully',
        data: province
    });
}
