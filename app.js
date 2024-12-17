const createError = require('http-errors');
const http = require("http");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const paysRouter = require('./routes/pays');

const app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Socket.IO Setup
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on('connection', (socket) => {
  console.log('User Connected!');
  socket.emit("msg", "Welcome to the Socket.IO server!");

  // Handle custom events if needed
  socket.on('msg', (message) => {
    console.log("Message from client:", message);
    io.emit('msg', message); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log("User Disconnected.");
  });
});

server.listen(3001, () => console.log("Server is running on http://localhost:3001"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pays', paysRouter);

// Catch 404 and Forward to Error Handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// MongoDB Connection
const mongoConnectionConfig = require("./config/database.json");

mongoose.connect(mongoConnectionConfig.url)
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });

module.exports = app;
