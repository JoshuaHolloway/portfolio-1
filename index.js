// -invoke .config mehtod on object returned.
// -We want the resulting side effects of this!
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// ==============================================

const { PORT } = require('./config');

// ==============================================

server.use(express.json());
server.use(cors());
server.use(helmet());
// -It is possible for middlewars to
//  modify conflicting headers.
// -Whichever middleware that
//  comes last wins!

// ==============================================

// -Catch all
server.use('*', (req, res, next) => {
  res.json({ message: 'catch all endpoint!' });
});

// ==============================================

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

// ==============================================
