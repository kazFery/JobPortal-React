const sql = require("./db.js");

// constructor
const Posting = function (posting) {
  this.job_title = posting.title;
  this.job_description = posting.description;
  this.job_location = posting.location;
  this.job_type = posting.type;
  this.job_salary = posting.salary;
  this.status = posting.status;
  this.ownerId = posting.ownerId;
};

Posting.create = (newPosting, result) => {
  sql.query("INSERT INTO postings SET ?", newPosting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created posting: ", { id: res.insertId, ...newPosting });
    result(null, { id: res.insertId, ...newPosting });
  });
};

Posting.findById = (id, result) => {
  sql.query(`SELECT * FROM postings WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found posting: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Posting with the id
    result({ kind: "not_found" }, null);
  });
};

Posting.getAll = (title, result) => {
  let query = "SELECT * FROM postings";

  if (title) {
    query += ` WHERE job_title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("postings: ", res);
    result(null, res);
  });
};

Posting.getAllisDone = (result) => {
  sql.query("SELECT * FROM postings WHERE isDone=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("postings: ", res);
    result(null, res);
  });
};

Posting.updateById = (id, posting, result) => {
  sql.query(
    "UPDATE postings SET job_title = ?, job_description = ?, job_location = ?, job_type = ?, job_salary = ? WHERE id = ?",
    [
      posting.job_title,
      posting.job_description,
      posting.job_location,
      posting.job_type,
      posting.job_salary,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Posting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated posting: ", { id: id, ...posting });
      result(null, { id: id, ...posting });
    }
  );
};

Posting.remove = (id, result) => {
  sql.query("DELETE FROM postings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Posting with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted posting with id: ", id);
    result(null, res);
  });
};

module.exports = Posting;
