import React, { useState, useEffect } from "react";
import PostingDataService from "../services/PostingService";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const PostingList = () => {
  const [postings, setPostings] = useState([]);
  const [currentPosting, setCurrentPosting] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  //
  const [showAply, setShowApply] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  //

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    retrievePostings();
    if (user) {
      setCurrentUser(user);
      setShowApply(user.roles.includes("ROLE_USER"));
    }
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePostings = () => {
    PostingDataService.getAll()
      .then((response) => {
        setPostings(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePostings();
    setCurrentPosting(null);
    setCurrentIndex(-1);
  };

  const setActivePosting = (posting, index) => {
    setCurrentPosting(posting);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    PostingDataService.findByTitle(searchTitle)
      .then((response) => {
        setPostings(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row m-3">
      <div className="col-md-8">
        <div className="input-group my-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Posting List</h4>

        <ul className="list-group">
          {postings &&
            postings.map((posting, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePosting(posting, index)}
                key={index}
              >
                <h4>{posting.job_title}</h4>
                <div>
                  {posting.job_location} <div>Salary: {posting.job_salary}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6 mb-3">
        {currentPosting ? (
          <div>
            <h4>Posting</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPosting.job_title}
            </div>
            <div>
              <label>
                <strong>Location:</strong>
              </label>{" "}
              {currentPosting.job_location}
            </div>
            <div>
              <label>
                <strong>Salary:</strong>
              </label>{" "}
              {currentPosting.job_salary + " CAD"}
            </div>

            <div>
              <label>
                <strong>Type:</strong>
              </label>{" "}
              {currentPosting.job_type}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPosting.job_description}
            </div>
            <div>
              <strong>Posted on: </strong>

              {currentPosting.posted_date.substring(0, 10)}
            </div>
            {/* {currentUser.id === currentPosting.ownerId ? (
              <Link
                to={"/postings/" + currentPosting.id}
                className="btn btn-warning mr-3"
              >
                Edit
              </Link>
            ) : (
              <div></div>
            )} */}
            {showAply && (
              <Link
                to={"/apply/" + currentPosting.id}
                className="btn btn-success my-3"
              >
                Apply
              </Link>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Posting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostingList;
