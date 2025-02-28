import { NextFunction , Response, Request } from "express";

import { HTTP_STATUS } from "@src/constants";
import { IRegion } from "@src/types/regionsTypes";

const { Region } = require('../../models')

export const getRegions = async ( req : Request, res : Response,  next : NextFunction ) : Promise<void> => {
    const regions : Pick<IRegion, "region_name" | "region_code"> = await Region.findAll({
        attributes: ['region_name', 'region_code']
    });

    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Regions Retrieved Successfully',
        data: regions
    });
}
