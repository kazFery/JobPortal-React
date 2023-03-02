const { authJwt } = require("../middleware");

module.exports = (app) => {
  const postings = require("../controllers/posting.controller.js");

  var router = require("express").Router();

  // Create a new Posting
  router.post("/", [authJwt.verifyToken, authJwt.isCompany], postings.create);

  // Retrieve all Postings
  router.get("/", postings.findAll);

  // Retrieve all published Postings
  router.get("/published", postings.findAllisDone);

  // Retrieve a single Posting with id
  router.get("/:id", postings.findOne);

  // Update a Posting with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isCompany], postings.update);

  // Delete a Posting with id
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isCompany],
    postings.delete
  );

  app.use("/api/postings", router);
};
