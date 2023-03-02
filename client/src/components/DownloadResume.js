import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import http from "../http-common";

const DownLoadFile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [file, setFile] = useState(undefined);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  function downloadFromS3(filename) {
    http.get("/" + currentUser.id + "/resume/" + filename, (err, res) => {
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
      <div className="d-grid gap-2 col-6 mx-auto">
        <button type="submit" className="ml-10 btn btn-success btn-lg ">
          DownLoad
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
    </div>
  );
};
export default DownLoadFile;
