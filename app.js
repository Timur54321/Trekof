const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const objectRouter = require('./routes/objectRouter');
const viewRouter = require('./routes/viewRouter');
const htmlRouter = require('./routes/htmlRouter');
const userRouter = require('./routes/userRouter');
const mediafileRouter = require('./routes/mediafileRouter');
const requestRouter = require('./routes/requestRouter');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/file', objectRouter);
app.use('/', viewRouter);
app.use('/api/v1/html', htmlRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/mediafiles', mediafileRouter);
app.use('/api/v1/requests', requestRouter);

module.exports = app;