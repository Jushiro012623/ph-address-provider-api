import { NextFunction , Response, Request } from "express";

import { HTTP_STATUS } from "@src/constants";
import { ICountry } from "@src/types/countryTypes";

const { Country } = require('../../models')

export const getCountries = async ( req : Request, res : Response,  next : NextFunction ) : Promise<void> => {
     const countries : Pick<ICountry, "name" | "country_code" | "nationality"> = await Country.findAll({
        attributes: ['name', 'country_code', 'nationality']
    });

    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Countries Retrieved Successfully',
        data: countries
    });
}
