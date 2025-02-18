const express = require('express');
const expressListRoutes = require('express-list-routes');
const app = express()
const routeList = () => {
    expressListRoutes(express())
}
routeList()