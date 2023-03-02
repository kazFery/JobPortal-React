const sql = require("./db.js");

// constructor
const Apply = function (apply) {
  this.user_id = apply.user_id;
  this.company_id = apply.company_id;
  this.posting_id = apply.posting_id;
  this.fullName = apply.fullName;
  this.status = apply.status;
  this.resume = apply.resume;
};

Apply.create = (newApply, result) => {
  sql.query("INSERT INTO applyings SET ?", newApply, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created apply: ", { id: res.insertId, ...newApply });
    result(null, { id: res.insertId, ...newApply });
  });
};



module.exports = Apply;
