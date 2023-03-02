const { default: UserList } = require("../../../client/src/components/UserList.js");
const sql = require("./db.js");

// constructor
const UserList = function (UserList) {
  this.user_id = users.id;
  this.user_username = users.username;
  this.user_email = users.email;
  this.user_password = users.password;
  this.user_role = users.role;
  this.user_fullName = users.fullName;
};


UserList.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Posting with the id
    result({ kind: "not_found" }, null);
  });
};

UserList.getAll = (username, result) => {
  let query = "SELECT * FROM users";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};


UserList.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted users with id: ", id);
    result(null, res);
  });
};

module.exports = UserList;
