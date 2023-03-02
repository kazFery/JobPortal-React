import React, { useState, useEffect } from "react";
import ApplyService from "../services/ApplyService";
import AuthService from "../services/auth.service";

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const [change, setchange] = useState(false);

  const getAllAplications = (companyId) => {
    ApplyService.getAllAplicationsByCompanyId(companyId)
      .then((response) => {
        setApplicants(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changeStatusApplication = (id) => {
    ApplyService.updateStatusAplications(id)
      .then((res) => {
        console.log("updated");
        setchange((prevChange) => !prevChange);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllAplications(currentUser.id);
  }, []);

  useEffect(() => {
    getAllAplications(currentUser.id);
  }, [change]);

  return (
    <div className="list row m-3">
      {applicants.length ? (
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th> Applicant ID</th>
              <th> Full Name</th>
              <th> Job title</th>
              <th> Application Status </th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id}>
                <td> {applicant.user_id}</td>
                <td>
                  <button className="btn btn-sucess">
                    <a
                      className="link-info"
                      href={`${process.env.REACT_APP_ROOT_URL}/api/user/${applicant.user_id}/resume`}
                      download
                    >
                      {" "}
                      {applicant.fullName}
                    </a>
                  </button>
                </td>
                <td>{applicant.posting.job_title}</td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      id="statusBtn"
                      checked={applicant.status}
                      className="btn btn-success"
                      onChange={() => changeStatusApplication(applicant.id)}
                    />
                    {applicant.status ? "Active" : "Inactive"}
                  </label>
                </td>
                {/* <td>
            <button onClick={() => applicant.id}>Accept</button>
          </td>  */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p> No Application to display </p>
      )}
    </div>
  );
};
export default ApplicantList;
