const Posting = require("../models/posting.model.js");

// Create and Save a new Posting
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Posting
  const posting = new Posting({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    type: req.body.type,
    salary: req.body.salary,
    status: req.body.status,
    ownerId: req.body.ownerId,
  });

  // Save Posting in the database
  Posting.create(posting, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Posting.",
      });
    else res.send(data);
  });
};

// Retrieve all Postings from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Posting.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving postings.",
      });
    else res.send(data);
  });
};

// Find a single Posting by Id
exports.findOne = (req, res) => {
  Posting.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Posting with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Posting with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all isDone Postings
exports.findAllisDone = (req, res) => {
  Posting.getAllisDone((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving postings.",
      });
    else res.send(data);
  });
};

// Update a Posting identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Posting.updateById(req.params.id, new Posting(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Posting with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Posting with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Posting with the specified id in the request
exports.delete = (req, res) => {
  Posting.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Posting with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Posting with id " + req.params.id,
        });
      }
    } else res.send({ message: `Posting was deleted successfully!` });
  });
};
