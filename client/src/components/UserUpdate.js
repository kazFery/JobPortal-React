import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserDataService from "../services/UserService";

const UserUpdate = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialUserState = {
    id: null,
    username: "",
    email: "",
    role: "",
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = (id) => {
    UserDataService.get(id)
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getUser(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then((response) => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then((response) => {
        console.log(response.data);
        navigate("/admin");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>

            {/* <div className="form-group">
              <label>
                <strong>Role:</strong>
              </label>
              {currentUser.role}
            </div> */}
            <div className="form-group col-md-4">
              <label htmlFor="type">Type</label>
              <select
                type="text"
                className="form-control"
                id="role"
                required
                onChange={handleInputChange}
                name="role"
              >
                <option selected>{currentUser.role}</option>
                <option>admin</option>
                <option>company</option>
                <option>user</option>
              </select>
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default UserUpdate;
