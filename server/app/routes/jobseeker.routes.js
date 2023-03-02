module.exports = (app) => {
  const user = require("../controllers/jobseeker.controller.js");

  var router = require("express").Router();

  // Retrieve all users
  router.get("/", user.getAllusers);

  //  Retrieve a user by id
  router.get("/:id", async (req, res) => {
    const userData = await user.getUserById(req.params.id);
    if (userData) {
      console.log(userData);
      res.send(userData);
    } else {
      res.status(404).send({
        message: `User Not found By id ${req.params.id}.`,
      });
    }
  });

  // Update resume  by id
  router.patch("/:id", user.updateResumeById);

  // get resume  by id
  // router.get("/resume/:id", user.getResumeById);

  // Update profile by id
  router.patch("/profile/:id", async (req, res) => {
    try {
      await user.updateProfileById(
        req.params.id,
        req.body.email,
        req.body.fullName
      );
      res.status(200).send({ message: "Your info updated successfully!" });
    } catch (err) {
      console.error(err.message);
      res.status(400).send({ message: "you info can not updated" });
    }
  });

  app.use("/api/users", router);
};
