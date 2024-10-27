const AWS = require("aws-sdk");
// name of your bucket here
const NAME_OF_BUCKET = process.env.AWS_BUCKET_NAME
const multer = require("multer");

//  make sure to set environment variables in production for:
//  AWS_ACCESS_KEY_ID
//  AWS_SECRET_ACCESS_KEY
//  and aws will automatically use those environment variables

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// --------------------------- Public UPLOAD ------------------------
//These are middlewares for express
const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // filename will be key, so applending name to timestamps to ensure unique.  Inside S3 bucket
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key,
        Body: buffer,
        ACL: "public-read", //not in private upload
    };
    const result = await s3.upload(uploadParams).promise();
    // name of the file in bucket = DB key
    return result.Location; //not in private upload
};

const multiplePublicFileUpload = async (files) => {
    return await Promise.all(
        files.map((file) => {
            return singlePublicFileUpload(file);
        })
    );
};

// --------------------------- Prviate UPLOAD ------------------------
//Also middlewares for express/
const singlePrivateFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key,
        Body: buffer,
    };
    const result = await s3.upload(uploadParams).promise();
    // save the name of the file in your bucket as the key in your database to retrieve for later
    return result.Key;
};

const multiplePrivateFileUpload = async (files) => {
    return await Promise.all(
        files.map((file) => {
            return singlePrivateFileUpload(file);
        })
    );
};

const retrievePrivateFile = (key) => {
    let fileUrl;
    if (key) {
        fileUrl = s3.getSignedUrl("getObject", {
            Bucket: NAME_OF_BUCKET,
            Key: key,
        });
    }
    return fileUrl || key;
};

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});

const singleMulterUpload = (nameOfKey) => //'image' comes in
    multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).array(nameOfKey);

module.exports = {
    s3,
    singlePublicFileUpload,
    multiplePublicFileUpload,
    singlePrivateFileUpload,
    multiplePrivateFileUpload,
    retrievePrivateFile,
    singleMulterUpload,
    multipleMulterUpload,
};
