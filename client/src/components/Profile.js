import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import moment from "moment";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.id;
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const linkToPage = "/editProfile/" + id;

  const editProfile = () => {
    navigate("/editProfile/" + id);
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
        <p className=" pl-3">
          {" "}
          For ulpoading your resume, please <Link to={linkToPage}>
            {" "}
            Edit
          </Link>{" "}
          your profile
        </p>
        <div>
          <button className="btn btn-sucess">
            <a
              href={`${process.env.REACT_APP_ROOT_URL}/api/user/${userProfile.id}/resume`}
              download
            >
              Download your Resume
            </a>
          </button>
        </div>

        {/* <div className=" ml-3">
          <p>
            <strong>Upload your resume:</strong>
          </p>
        </div>
        <UploadFile /> */}
      </div>
    );
  }

  useEffect(() => {
    console.log(id);
    const result = UserService.getUserInfoById(id);
    result.then((res) => {
      setUserProfile(res.data);
    });
  }, [id]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <div className="text-dark ml-3">
        <strong>Email:</strong>
        <p className="ml-3 d-inline-block text-success font-weight-bold ">
          {userProfile.email}
        </p>
      </div>
      <div className="text-dark ml-3">
        <strong>
          {currentUser.roles[0] === "ROLE_USER"
            ? "Full Name: "
            : "Company Name: "}
        </strong>{" "}
        <p className=" ml-3 d-inline-block  text-success font-weight-bold ">
          {userProfile.fullName}{" "}
        </p>
      </div>
      {currentUser.roles[0] === "ROLE_USER" ? jobSeekerPart() : ""}
      <div className="d-grid gap-2 col-1 mx-auto">
        <button
          type="button"
          className="btn btn-info btn-lg"
          onClick={editProfile}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
