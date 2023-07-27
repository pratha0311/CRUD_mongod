const express = require("express");
const controller = require("./controller");
const routes = express.Router();

routes.get("/", controller.home);
routes.get("/signuppage", controller.signuppage);
routes.get("/loggedin", controller.loggedin);
routes.get("/signinpage", controller.signinpage);
routes.get("/all-users",controller.allusers);



routes.post("/signup", controller.signup)
routes.post("/signin", controller.signin)

module.exports = routes;
