const express = require("express");
const controller = require("./controller");
const routes = express.Router();

routes.get("/", controller.home);
routes.get("/signuppage", controller.signuppage);
routes.get("/loggedin", controller.loggedin)



routes.post("/signup", controller.signup)

module.exports = routes;
