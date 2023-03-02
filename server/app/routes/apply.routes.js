module.exports = (app) => {
  const applyings = require("../controllers/apply.controller.js");

  var router = require("express").Router();

  // Create a new Apply
  router.post("/", applyings.create);

  // get all aplication from a company (Farzaneh)
  router.get("/", applyings.searchApplications);

  // update status of a aplicant of a company (Farzaneh)
  router.patch("/status/:id", applyings.updateStatusApplication);

  // // Retrieve all Postings
  // router.get("/", postings.findAll);

  // // Retrieve all published Postings
  // router.get("/published", postings.findAllisDone);

  // // Retrieve a single Posting with id
  // router.get("/:id", postings.findOne);

  // // Update a Posting with id
  // router.put("/:id", postings.update);

  // // Delete a Posting with id
  // router.delete("/:id", postings.delete);

  app.use("/api/apply", router);
};
