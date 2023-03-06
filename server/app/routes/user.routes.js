const { authJwt } = require("../middleware");
const sanitize = require("sanitize-filename");
const controller = require("../controllers/user.controller");
const jobSeekercontroller = require("../controllers/jobseeker.controller");

const { uploadFileToS3, getFileStreamFromS3 } = require("../../s3");
const multer = require("multer");
const upload = multer({ dest: "resume/" });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/company",
    [authJwt.verifyToken, authJwt.isCompany],
    controller.companyBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // S3 upload file
  app.post("/api/user/:id/resume", upload.single("file"), async (req, res) => {
    const id = req.params.id;
    const file = req.file;
    const result = await uploadFileToS3(file);
    if (!result) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(result.key + "    " + id);
      jobSeekercontroller.updateResumeById(id, result.key);
      res.status(200).send({ message: "Your File uploaded successfully!" });
    }
  });

  // S3 download file
  app.get("/api/user/:id/resume", async (req, res) => {
    const user = await jobSeekercontroller.getUserById(req.params.id);
    let filename = user.fullName;
    filename = sanitize(filename);
    if (filename == null) filename = "resume";
    var extension = user.resume.split(".");
    const ext = extension[entension.length - 1];
    const contentType = ext === "pdf" ? "application/pdf" : "application/docx";
    try {
      let fileToSend = await getFileStreamFromS3(user.resume);
      //  res.setHeader("Content-Length", stat.size);
      res.set({
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=${filename}.${ext}`,
      });
      // res.attachment();
      fileToSend.pipe(res);
    } catch (error) {
      res.send({ message: "Server Error" });
    }
  });
};
