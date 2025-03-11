const express = require('express');
const path = require('path');
const objectRouter = require('./routes/objectRouter');
const viewRouter = require('./routes/viewRouter');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/v1/file', objectRouter);
app.use('/', viewRouter);

module.exports = app;