import React, { useState, useEffect } from "react";
import "./Apply.css";
import ApplyDataService from "../../services/ApplyService";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import PostingService from "../../services/PostingService";
import { useParams, Link } from "react-router-dom";
import moment from "moment";

const Apply = () => {
  let applicantInitial = {
    id: 0,
    email: "",
    fullName: "",
    resumeDate: "",
    resume: "",
  };

  const currentUser = AuthService.getCurrentUser();
  const [apply, setApply] = useState([]);
  const [currentPosting, setCurrentPosting] = useState();
  const [submitted, setSubmitted] = useState(false);

  const [applicant, setApplicant] = useState(applicantInitial);

  // get id from url
  const { id } = useParams();
  // get posting by id
  const getPosting = (id) => {
    PostingService.get(id)
      .then((response) => {
        setCurrentPosting(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id) getPosting(id);
  }, [id]);

  const initialApplyState = {
    id: null,
    user_id: null,
    company_id: null,
    posting_id: null,
    status: false,
    resume: null,
    full_name: "",
  };

  // Get user by Id from db
  const user_id = AuthService.getCurrentUser().id;
  const getUser = (user_id) => {
    UserService.getUserInfoById(user_id)
      .then((response) => {
        setApplicant({
          ...applicant,
          id: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          resumeDate: moment().format("YYYY-MM-DD"),
          resume: response.data.resume,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeFullName = (e) => {
    UserService.getUserInfoById(user_id).then((response) => {
      setApplicant({
        ...applicant,
        id: response.data.id,
        fullName: e.target.value,
        email: response.data.email,
        resumeDate: moment().format("YYYY-MM-DD"),
        resume: response.data.resume,
      });
    });
  };

  useEffect(() => {
    if (user_id) getUser(user_id);
  }, [user_id]);

  // Save Apply
  const saveApply = () => {
    let data = {
      user_id: currentUser.id,
      company_id: currentPosting.ownerId,
      posting_id: currentPosting.id,
      status: true,
      fullName: applicant.fullName,
      resume: applicant.resume,
      // resumeDate: applicant.resumeDate,
    };
    console.log(data);

    //return;
    ApplyDataService.create(data)
      .then((response) => {
        setApply({
          id: response.data.id,
          user_id: response.data.user_id,
          company_id: response.data.company_id,
          posting_id: response.data.posting_id,
          fullName: response.data.fullName,
          status: response.data.status,
          resume: response.data.resume,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newApply = () => {
    setApply(initialApplyState);
    setSubmitted(false);
  };
  var resume = true;
  if (applicant.resume === null || applicant.fullName === null) {
    resume = false;
  }

  const firstComponent = (props) => {
    return (
      <div>
        {!props.resume || !props.fullName ? (
          <div>
            <h2>You can not upplay without resume or Full Name!</h2>
            <p>Please go to your profile and compleet it. </p>
            <Link to="/profile"> To profile</Link>
          </div>
        ) : (
          <div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                defaultValue={props.fullName}
                onChange={onChangeFullName}
              />
            </div>
            <div>
              <br />
              <strong>Email: </strong>
              {props.email}
            </div>
          </div>
        )}
      </div>
    );
  };

  const secondComponent = (props) => {
    return (
      <div>
        {props.resume ? (
          <div>
            <h1>Your resume :</h1>
            <p>Use your uploaded resume: {props.resume}</p>
            <div>Uploaded on: {props.resumeDate}</div>
          </div>
        ) : (
          <div>No resume {(resume = false)}</div>
        )}
      </div>
    );
  };

  const finalComponent = (props) => {
    console.log(props);
    return (
      <div>
        <h4>Please review your application</h4>

        <div>
          <br />
          <strong>Full name: </strong>
          {props.fullName}
        </div>
        <div>
          <strong>Email: </strong>
          {props.email}
        </div>
        <div>
          <strong>Resume: </strong>
          {props.resume}
        </div>
      </div>
    );
  };

  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "First Step",
      isDone: true,
      component: firstComponent,
    },
    {
      key: "secondStep",
      label: "Second Step",
      isDone: false,
      component: secondComponent,
    },
    {
      key: "finalStep",
      label: "Final Step",
      isDone: false,
      component: finalComponent,
    },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
      saveApply();
      // alert("You have completed all steps.");
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      })
    );
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index === 0) return;

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      })
    );
    setActiveStep(steps[index - 1]);
  };

  return (
    <div>
      {" "}
      {submitted ? (
        <div>
          <h4>You Applyed successfully!</h4>
          <Link to="/" className="btn btn-success">
            {" "}
            Search more jobs{" "}
          </Link>
        </div>
      ) : (
        <div className="Apply">
          {currentPosting && currentUser && applicant ? (
            <div>
              <h4>Applying for the job: {currentPosting.job_title}</h4>
              <div className="box">
                <div className="steps">
                  <ul className="nav">
                    {steps.map((step, i) => {
                      return (
                        <li
                          key={i}
                          className={`${
                            activeStep.key === step.key ? "active" : ""
                          } ${step.isDone ? "done" : ""}`}
                        >
                          <div>
                            Step {i + 1}
                            <br />
                            <span>{step.label}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="step-component">
                  {activeStep.component(applicant)}
                </div>
                <div className="btn-component">
                  <input
                    type="button"
                    value="Back"
                    onClick={handleBack}
                    disabled={steps[0].key === activeStep.key}
                  />
                  <input
                    type="button"
                    value={
                      steps[steps.length - 1].key !== activeStep.key
                        ? "Next"
                        : "Submit"
                    }
                    onClick={handleNext}
                    disabled={resume == false}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Loading...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Apply;
