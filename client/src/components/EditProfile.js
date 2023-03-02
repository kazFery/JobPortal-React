import React, { useEffect, useState, useRef } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import http from "../http-common";

import moment from "moment";
import { useParams, Link } from "react-router-dom";

const EditProfile = () => {
  const currentUser = AuthService.getCurrentUser();
  const { id } = useParams();
  // const { id } = currentUser.id;
  const [file, setFile] = useState(undefined);
  const [message, setMessage] = useState({ msg: "", isError: false });
  const [isActive, setIsActive] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: "",
    fullName: "",
  });
  const inputFileRef = useRef(null);

  const handleChange = (e) => {
    setIsChange(!isChange);
    console.log(isChange);
    e.preventDefault();
    const { name, value } = e.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFile(undefined);
    inputFileRef.current.value = null;
    const result = UserService.getUserInfoById(id);
    result.then((res) => {
      setUserProfile(res.data);
    });
    setIsChange(false);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  async function uploadService(file) {
    let formData = new FormData();
    formData.append("file", file);

    if (
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/docx"
    ) {
      return http.post("/user/" + currentUser.id + "/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      setIsActive(true);
      setMessage({ msg: "File must be a pdf or word document", isError: true });
    }
  }

  const upload = async (event) => {
    event.preventDefault();
    const result = await http.patch("/users/profile/" + currentUser.id, {
      email: userProfile.email,
      fullName: userProfile.fullName,
    });
    setIsActive(true);
    const error = result.status === 200 ? false : true;
    console.log(result.data.message);
    setMessage({ msg: result.data.message, isError: error });
    if (file) {
      uploadService(file)
        .then((response) => {
          setIsActive(true);
          setMessage({ msg: response.data.message, isError: false });
          return file;
        })
        .catch(() => {
          setIsActive(true);
          setMessage({
            msg: "Could not upload the file!. File must be a pdf or word document",
            isError: true,
          });
          setFile(undefined);
        });
    }
  };

  function jobSeekerPart() {
    return (
      <div>
        <div className="text-dark ml-3">
          <strong>Last Resume Uploaded Date :</strong>{" "}
          <p className="d-inline-block p-3 text-success font-weight-bold ">
            {" "}
            {userProfile.resumeDate
              ? moment(userProfile.resumeDate).format("LL") +
                "  at  " +
                moment(userProfile.resumeDate).format("h:mm A")
              : "No Resume"}
          </p>
        </div>
        <div className=" ml-3">
          <p>
            <strong>Upload your resume:</strong>
          </p>
        </div>
        <div className="form-group">
          <input
            className="border border-3 ml-3 "
            type="file"
            onChange={fileSelected}
            name="file"
            ref={inputFileRef}
            accept="application/pdf, application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>
      </div>
    );
  }

  useEffect(() => {
    console.log(id);
    const result = UserService.getUserInfoById(id);
    result.then((res) => {
      setUserProfile(res.data);
    });
  }, [file]);

  const alertClass = message.isError ? "alert-danger" : "alert-success";

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <form onSubmit={upload}>
        <div className="form-group">
          <label className="text-dark ml-3 font-weight-bold">Email:</label>
          <input
            type="email"
            name="email"
            className="ml-3 d-inline-block text-success font-weight-bold "
            value={userProfile.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="text-dark ml-3 font-weight-bold">
            {currentUser.roles[0] === "ROLE_USER"
              ? "Full Name: "
              : "Company Name: "}
          </label>
          <input
            type="text"
            name="fullName"
            className=" ml-3 d-inline-block  text-success font-weight-bold "
            value={userProfile.fullName || ""}
            onChange={handleChange}
          />
        </div>

        {currentUser.roles[0] === "ROLE_USER" ? jobSeekerPart() : ""}
        <div className="d-grid gap-2 col-10 mx-auto">
          <button type="submit" className="btn btn-info btn-lg center-block">
            Save
          </button>
          <button
            type="button"
            disabled={!file && !isChange}
            className="btn btn-info btn-lg center-block ml-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        <div
          className={
            isActive
              ? `alert ${alertClass} visible mt-5`
              : `alert ${alertClass} invisible mt-5`
          }
          role="alert"
        >
          {message.msg}
        </div>
      </form>
      <Link to="/profile"> Back to profile</Link>
    </div>
  );
};

export default EditProfile;
