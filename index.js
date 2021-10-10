// -invoke .config mehtod on object returned.
// -We want the resulting side effects of this!
require('dotenv').config();

const express = require('express');
const server = express();

const path = require('path');
const rootDir = require('./util/path');

// ==============================================

const { PORT } = require('./config');

// ==============================================

server.use(require('cors')());
server.use(express.json());
server.use(express.static(path.join(rootDir, 'public')));
server.use(require('helmet')());

// ==============================================

// -Catch all
server.use('*', (req, res, next) => {
  // res.json({ message: 'catch all endpoint!' });
  res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

// ==============================================

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

// ==============================================
