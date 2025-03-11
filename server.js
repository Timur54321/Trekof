const app = require("./app");
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});
const RS = require("./utils/RecomSystem");

const fileBuffer = fs.readFileSync('terriblestuff.jpg');

// s3.upload(params, (err, data) => {
//     if (err) {
//         console.log(err, err.stack);
//     } else {
//         console.log(data);
//     }
// });

const port = 3000;
const localDatabase = "mongodb://localhost:27017/trekof";

let localScale = {
    "Поп": 10,
    "Гиперпоп": 10,
    "Рок": 10,
    "New Wave": 10,
    "Пост-рок": 10,
    "Прогрессивный рок": 10,
    "Инди": 10,
    "Метал": 10,
    "Альтернатива": 10,
    "Хардкор": 10,
    "Пост-хардкор": 10,
    "Электроника": 10,
    "Техно": 10,
    "Хаус": 10,
    "Транс": 10,
    "Дабстеп": 10,
    "Ambient": 10,
    "Фонк": 10,
    "Фанк": 10,
    "EDM": 10,
    "Рэп": 10,
    "Хип-хоп": 10,
    "R'n'B": 10,
    "Соул": 10,
    "Джаз": 10,
    "Ска": 10,
    "Панк": 10,
    "Пост-панк": 10,
    "Фолк": 10,
    "Гиперпоп": 10,
}

mongoose.connect(localDatabase).then(() => console.log("Подключение к базе данных было установлено")).catch(err => console.log(err));

const server = app.listen(port, () => {
    console.log('App running on port 3000...');
    RS.calcInterestScale("Альтернатива", localScale);
    RS.calcInterestScale("Альтернатива", localScale);
    RS.calcInterestScale("Альтернатива", localScale);
    RS.calcInterestScale("Альтернатива", localScale);
    RS.calcInterestScale("Рок", localScale);
    RS.calcInterestScale("Рок", localScale);
    RS.calcInterestScale("Рок", localScale);
    RS.calcInterestScale("Рок", localScale);
    RS.calcInterestScale("Инди", localScale);
    RS.calcInterestScale("Инди", localScale);
    RS.calcInterestScale("Инди", localScale);
    RS.calcInterestScale("Инди", localScale);

});