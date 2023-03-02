const Apply = require("../models/apply.model.js");

//Farzaneh
const db = require("../models");

exports.searchApplications = async (req, res) => {
  const params = req.query;
  if (!params) {
    res.sendStatus(404);
    return;
  }
  const ownerId = params.ownerId;
  if (ownerId == null) {
    res.sendStatus(400);
    return;
  }
  const apps = await db.apply.findAll({
    include: {
      model: db.posting,
      where: {
        ownerId: ownerId,
      },
    },
  });
  res.send(apps);
};

exports.updateStatusApplication = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const app = await db.apply.findOne({ where: { id: id } });
  console.log(app);
  // if (!app) {
  //   res.send.status(500);
  //   return;
  // }
  await db.apply.update({ status: !app.status }, { where: { id: id } });
  res.sendStatus(200);
};
//Farzaneh

// Create and Save a new Apply
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Apply
  const apply = new Apply({
    id: req.body.id,
    user_id: req.body.user_id,
    company_id: req.body.company_id,
    posting_id: req.body.posting_id,
    fullName: req.body.fullName,
    status: req.body.status,
    resume: req.body.resume,
  });

  // Save Posting in the database
  Apply.create(apply, (err, data) => {
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
