const express = require('express');

const server = express();

// ==============================================

server.use(express.json());
server.use(require('helmet')());
server.use(require('cors')());

// ==============================================

const authRouter = require('./auth/auth-router');
server.use('/api/auth', authRouter);

const usersRouter = require('./users/users-router');
server.use('/api/users', usersRouter);

// ==============================================

const paths = require('../util/path');
server.use(express.static(paths.public_path()));

// ==============================================

// -Catch all endpoint
server.use('*', (req, res, next) => {
  // res.json({ message: 'catch all endpoint!' });
  res.sendFile(paths.index_path());
});

// ==============================================

module.exports = server;
