const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const objectRouter = require('./routes/objectRouter');
const viewRouter = require('./routes/viewRouter');
const htmlRouter = require('./routes/htmlRouter');
const userRouter = require('./routes/userRouter');
const mediafileRouter = require('./routes/mediafileRouter');
const requestRouter = require('./routes/requestRouter');
const playlistRouter = require('./routes/playlistRouter');
const friendLinksRouter = require('./routes/friendLinksRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');
const postRouter = require('./routes/postRouter');
const channelRouter = require('./routes/channelRouter');
const commentRouter = require('./routes/commentRouter');
const albumRouter = require('./routes/albumRouter');
const blockRequestRouter = require('./routes/blockRequestRouter');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

app.use('/api/v1/file', objectRouter);
app.use('/', viewRouter);
app.use('/api/v1/html', htmlRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/mediafiles', mediafileRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/playlists', playlistRouter);
app.use('/api/v1/friendLinks', friendLinksRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/channels', channelRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/albums', albumRouter);
app.use('/api/v1/blockRequests', blockRequestRouter);

module.exports = app;