require('dotenv').config();

const express = require('express');
const server = require('./api/server');

const path = require('path');
const rootDir = require('./util/path');

// ==============================================

server.use(express.json());

// ==============================================

server.use(express.static(path.join(rootDir, 'public')));
server.use(require('helmet')());

// ==============================================

// -Catch all endpoint
server.use('*', (req, res, next) => {
  // res.json({ message: 'catch all endpoint!' });
  res.sendFile(path.join(rootDir, 'public', 'views', 'index.html'));
});

// ==============================================

const { PORT } = require('./config');

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
