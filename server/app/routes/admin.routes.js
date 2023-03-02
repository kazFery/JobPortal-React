const { authJwt } = require("../middleware");

module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");

  var router = require("express").Router();

  // Retrieve all Users
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], admin.findAll);

  // Retrieve a single User with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], admin.findOne);

  // Update a User with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], admin.update);

  // Delete a User with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], admin.delete);

  app.use("/api/admin/users", [authJwt.verifyToken, authJwt.isAdmin], router);
};
