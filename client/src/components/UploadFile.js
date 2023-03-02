import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import http from "../http-common";

const UploadFile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [file, setFile] = useState(undefined);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

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
      setMessage("File must be a pdf or word document");
    }
  }

  const upload = async (event) => {
    event.preventDefault();
    uploadService(file)
      .then((response) => {
        setIsActive(true);
        setMessage(response.data.message);
        return file;
      })
      .catch(() => {
        setIsActive(true);
        setMessage(
          "Could not upload the file!. File must be a pdf or word document"
        );
        setFile(undefined);
      });
  };

  function downloadFromS3(filename) {
    http.get("/resume/" + filename, (err, res) => {
      if (err) console.log(err);
      else {
        res.download(res.data);
      }
    });
  }

  // const downloadResume = async (event) => {
  //   event.preventDefault();
  //   const filed = downloadFromS3(filename);
  //   res.download(file, function (err) {
  //     if (err) {
  //       console.log("Error");
  //       console.log(err);
  //     } else {
  //       console.log("Success");
  //     }
  //   });
  // };
  // useEffect(() => {
  //   setFile(undefined);
  // }, [file]);

  return (
    <div className="d-inline-block">
      <form onSubmit={upload}>
        <label className="btn btn-default">
          <input
            className="border border-3 "
            type="file"
            onChange={fileSelected}
            name="file"
            accept="application/pdf, application/msword"
          />
        </label>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            type="submit"
            className="ml-10 btn btn-success btn-lg  "
            disabled={!file}
          >
            Upload
          </button>
        </div>
        <div
          className={
            isActive
              ? "alert alert-danger visible"
              : " alert alert-danger invisible"
          }
          role="alert"
        >
          {message}
        </div>
      </form>
    </div>
  );
};
export default UploadFile;
