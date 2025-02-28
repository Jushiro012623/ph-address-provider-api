import { Application } from "express";
import { countriesRoutes } from "./routes/countryRoutes";
import { regionsRoutes } from "./routes/regionRoutes";
import expressListRoutes from "express-list-routes";
import { provinceRoutes } from "./routes/provinceRoutes";
import { citiesRoutes } from "./routes/cityRoutes";
import { barangayRoutes } from "./routes/barangayRoutes";


type BasePath = string;
type CountryPrefix = string;

export default (app : Application) => {

    const BASE_PATH : BasePath = '/api/v1';
    const PHILIPPINES : CountryPrefix = '/ph';
    
    const routes = () => {
        app.use(BASE_PATH,countriesRoutes)

        //Philippines Addresses
        app.use(BASE_PATH + PHILIPPINES,regionsRoutes)
        app.use(BASE_PATH + PHILIPPINES,provinceRoutes)
        app.use(BASE_PATH + PHILIPPINES,citiesRoutes)
        app.use(BASE_PATH + PHILIPPINES,barangayRoutes)

        //Japan Addresses

        expressListRoutes(app)
    }
    routes();
}
