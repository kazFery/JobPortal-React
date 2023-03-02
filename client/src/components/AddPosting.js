import React, { useState } from "react";
import PostingDataService from "../services/PostingService";
import AuthService from "../services/auth.service";

const AddPosting = () => {
  const currentUser = AuthService.getCurrentUser();

  const initialPostingState = {
    id: null,
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
    status: true,
    ownerId: currentUser.id,
  };
  const [posting, setPosting] = useState(initialPostingState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPosting({ ...posting, [name]: value });
  };

  const savePosting = () => {
    let data = {
      title: posting.title,
      description: posting.description,
      location: posting.location,
      type: posting.type,
      salary: posting.salary,
      status: true,
      ownerId: currentUser.id,
    };

    PostingDataService.create(data)
      .then((response) => {
        setPosting({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          location: response.data.location,
          type: response.data.type,
          status: response.data.status,
          ownerId: response.data.ownerId,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPosting = () => {
    setPosting(initialPostingState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      <h4>Add a new Posting:</h4>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPosting}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={posting.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div class="form-row">
            {/* Location */}
            <div className="form-group col-md-4">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                required
                value={posting.location}
                onChange={handleInputChange}
                name="location"
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
                value={posting.type}
                onChange={handleInputChange}
                name="type"
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
                value={posting.salary}
                onChange={handleInputChange}
                name="salary"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              rows="3"
              type="text"
              className="form-control"
              id="description"
              required
              value={posting.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={savePosting} className="btn btn-success">
            Add Posting
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPosting;
