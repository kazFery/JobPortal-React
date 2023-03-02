require("dotenv").config();

const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKey,
  secretAccessKey,
});

// upload a file to s3
async function uploadFileToS3(fileObj) {
  const fileStream = fs.createReadStream(fileObj.path);

  const ft = await import("file-type");
  const type = await ft.fileTypeFromStream(fileStream);
  console.log("type");

  let ext = "";
  if (type.mime === "application/pdf") ext = ".pdf";
  else if (
    type.mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    type.mime === "application/docx"
  )
    ext = ".docx";
  else return null;

  const uploadParams = {
    Bucket: bucketName,
    Body: fs.createReadStream(fileObj.path),
    Key: fileObj.filename + ext, // use uuid generator  for key
  };

  const uploadData = await s3.upload(uploadParams).promise();
  // delete the file from server after uploading to S3
  try {
    fs.unlinkSync("./resume/" + fileObj.filename);
    //file removed
  } catch (err) {
    console.error(err);
  }
  return uploadData;
}

// downloads a file from s3
async function getFileStreamFromS3(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();

  // const writeStream = fs.createWriteStream(path.join(__dirname, "s3data.pdf"));
  // readStream.pipe(writeStream);
  //  return data;
  // var stat = fs.statSync(downloddata);

  // return res;
}
module.exports = { getFileStreamFromS3, uploadFileToS3 };
