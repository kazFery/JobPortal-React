const db = require("../models");
const User = db.user;

exports.getAllusers = async (req, res) => {
  var users = await User.findAll({});
  if (users) {
    res.send(users);
  } else {
    res.status(404).send({
      message: "There is no user to show",
    });
  }
};

exports.getUserById = async (id) => {
  return await User.findOne({
    // attributes: ["id", "email", "fullname", "resumeDate"],
    where: { id: id },
  });
  
};

exports.updateResumeById = async (id, filename) => {
  // const filename = req.body.filename;
  // const id = req.params.id;
  let user = await User.findOne({ where: { id: id } });
  if (user) {
    await User.update(
      { resume: filename, resumeDate: new Date() },
      { where: { id: id } }
    );
    //   res.status(200).send("updated");
    // } else {
    //   res.status(404).send("Error");
  }
};

exports.updateProfileById = async (id, email, fullname) => {
  let user = await User.findOne({ where: { id: id } });
  if (user) {
    await User.update(
      { email: email, fullName: fullname },
      { where: { id: id } }
    );
    console.log(`Updated user ${id} with ${fullname} ${email}`);
  } else {
    console.log(`Did not find user ${id}`);
  }
};

// exports.getResumeById = async (req, res) => {
//   var user = await User.findOne({
//     attributes: ["id", "fullname", "resume", "resumeDate"],
//     where: { id: req.params.id },
//   });
//   if (user) {
//     res.send(user);
//   } else {
//     res.status(404).send({
//       message: `User Not found By id ${req.params.id}.`,
//     });
//   }
// };
