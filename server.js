const app = require("./app");
const mongoose = require('mongoose');
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
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

const fileBuffer = fs.readFileSync('terriblestuff.jpg');

const params = {
    Bucket: 'bucket-1',
    Key: 'terriblestuff.jpg',
    Body: fileBuffer,
    ContentType: 'image/jpeg',
};

// s3.upload(params, (err, data) => {
//     if (err) {
//         console.log(err, err.stack);
//     } else {
//         console.log(data);
//     }
// });

const port = 3000;
const localDatabase = "mongodb://localhost:27017/trekof";


mongoose.connect(localDatabase).then(() => console.log("Подключение к базе данных было установлено")).catch(err => console.log(err));

const server = app.listen(port, () => {
    console.log('App running on port 3000...');
});