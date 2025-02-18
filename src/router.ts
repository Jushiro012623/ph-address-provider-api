import { Application } from "express";
import { AuthRoutes } from "./routes/authRoutes";
import expressListRoutes from "express-list-routes";
import { UserRoutes } from "./routes/userRoutes";


type BasePath = string;
export default (app : Application) => {
    const BASE_PATH : BasePath = '/api/v1';

    const routes = () => {
        app.use(BASE_PATH, AuthRoutes);
        app.use(BASE_PATH, UserRoutes)
        expressListRoutes(app)
    }
    routes();
}
