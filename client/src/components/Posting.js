import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostingDataService from "../services/PostingService";
import AuthService from "../services/auth.service";

const Posting = (props) => {
  const currentUser = AuthService.getCurrentUser();
  const { id } = useParams();
  let navigate = useNavigate();

  const initialPostingState = {
    id: null,
    job_title: "",
    job_description: "",
    job_location: "",
    job_type: "",
    job_salary: "",
  };
  const [currentPosting, setCurrentPosting] = useState(initialPostingState);
  const [message, setMessage] = useState("");

  const getPosting = (id) => {
    PostingDataService.get(id)
      .then((response) => {
        setCurrentPosting(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getPosting(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPosting({ ...currentPosting, [name]: value });
  };

  const updatePosting = () => {
    PostingDataService.update(currentPosting.id, currentPosting)
      .then((response) => {
        console.log(response.data);
        setMessage("The posting was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePosting = () => {
    PostingDataService.remove(currentPosting.id)
      .then((response) => {
        console.log(response.data);
        navigate("/postings");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPosting ? (
        <div className="edit-form">
          <h4>Posting</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="job_title"
                name="job_title"
                defaultValue={currentPosting.job_title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                id="job_description"
                name="job_description"
                value={currentPosting.job_description}
                onChange={handleInputChange}
              />
            </div>

            {/* Location */}
            <div className="form-group col-md-4">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                required
                value={currentPosting.job_location}
                onChange={handleInputChange}
                name="job_location"
              />
            </div>
            {/* Type */}
            <div className="form-group col-md-4">
              <label htmlFor="type">Type</label>
              <select
                type="text"
                className="form-control"
                id="type"
                required
                value={currentPosting.job_type}
                onChange={handleInputChange}
                name="job_type"
              >
                <option selected></option>
                <option>Part-time</option>
                <option>Full-time</option>
              </select>
            </div>
            {/* Salary */}
            <div className="form-group col-md-4">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                className="form-control"
                id="salary"
                required
                value={currentPosting.job_salary}
                onChange={handleInputChange}
                name="job_salary"
              />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deletePosting}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePosting}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Posting...</p>
        </div>
      )}
    </div>
  );
};

export default Posting;
