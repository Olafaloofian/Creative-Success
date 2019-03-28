// AWS S3 handling imports
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

// AWS configuration and creation of S3 instance
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_ID,
    region: 'us-east-1'
})

const s3 = new aws.S3();

// multer file uploading configuration
const upload = multer({
    storage: multerS3({
        s3,
        // Name of bucket in S3
        bucket: 'michaelkerr-projectmedia',
        // Automatically choose content type based on file
        contentType: multerS3.AUTO_CONTENT_TYPE,
        // Adding image metadata
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        // This key will become the filename
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload
