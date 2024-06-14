const ItemsRoute = require("./ItemsRoute");
const CatergoriesRoute = require("./CatergoriesRoute");
const UsersRoute = require("./UsersRoute");
const OrderRoute = require("./OrderRoute");
const AuthRoute = require("./AuthRoute");

let route = (app) => {
  app.use("/api/items", ItemsRoute);
  app.use("/api/catergories", CatergoriesRoute);
  app.use("/api/users", UsersRoute);
  app.use("/api/orders", OrderRoute);
  app.use("/api/authenticator", AuthRoute);
} 

module.exports = route; 