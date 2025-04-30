const S3 = require('aws-sdk/clients/s3');
const dotenv = require('dotenv');
const {v4: uuidv4} = require('uuid');
dotenv.config({path: "./config.env"});

const s3 = new S3({
    credentials: {
        accessKeyId: process.env.S3ACCESS_KEY,
        secretAccessKey: process.env.S3SECRET_KEY
    },
    endpoint: "https://s3.storage.selcloud.ru",
    s3ForcePathStyle: true,
    region: "ru-1",
    apiVersion: "latest"
});

exports.getFile = async (req, res) => {
    try {
        const params = {
            Bucket: 'bucket-1',
            Key: req.params.key
        };

        const data = await s3.getObject(params).promise(); // Используем .promise()

        res.set('Content-Type', data.ContentType);
        res.send(data.Body);
    } catch (err) {
        res.status(404).json({ error: err.message || 'Failed to fetch file' });
    }
};

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) throw new Error("File was not founddd!!!");
        const fileName = `${uuidv4()}`;
        
        const params = {
            Bucket: 'bucket-1',
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };
        
        const data = await s3.upload(params).promise();
        res.json({ url: data.Location, data });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error loading file');
    }
}