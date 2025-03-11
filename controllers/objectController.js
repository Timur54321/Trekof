const S3 = require('aws-sdk/clients/s3');
const dotenv = require('dotenv');
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

console.log(process.env.S3ACCESS_KEY);

exports.getFile = (req, res) => {

    const params = {
        Bucket: 'bucket-1',
        Key: req.params.key
    };

    s3.getObject(params, (err, data) => {
        if (err) return res.status(404).send(err);

        res.set('Content-Type', data.ContentType);
        res.send(data.Body);
    });
    
};


exports.uploadFile = async (req, res) => {
    console.log("whatever happens here");
    const file = req.file;

    if (!file) return res.status(400).send("File was not laoded");


    const params = {
        Bucket: "bucket-1",
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimeType
    }

    try {
        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                res.status(500).send("Error loading file");
            }
            else {
                res.status(200).send({url: data.Location});
            }
        });
    }
    catch (err) {
        res.status(500).send("Error loading file");
    }

    // S3.uploadFile(params, (err, data) => {
    //     if (err) return res.status(500).send("File was't uploaded");

    //     res.status(200).send({
    //         status: "success",
    //         data: null
    //     });
    // });
    // res.status(200).send({status: "success"});
}