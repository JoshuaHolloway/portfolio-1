const express = require('express');

const server = express();

// ==============================================

server.use(express.json());
// server.use(require('helmet')());
// server.use(require('cors')());

// ==============================================
// -React way:
const path = require('path');

// -Root route serves the React app:
//  (react router routes also need
//   the catch-all endpoint!!!)
server.use(express.static(path.join(__dirname, 'client', 'build')));

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  console.log('In DEV mode');

  // on Heroku machine, an env variable is called "NODE_ENV" -> "production" or "development"
  const cors = require('cors');
  server.use(cors());
} else {
  const helmet = require('helmet');
  server.use(helmet());
}

// ==============================================
// -Routes:

const authRouter = require('./auth/auth-router');
server.use('/api/auth', authRouter);

const usersRouter = require('./users/users-router');
server.use('/api/users', usersRouter);

// ==============================================
// -Old-school HTML way:
//
// const paths = require('../util/path');
// server.use(express.static(paths.public_path()));
//
// // -Catch all endpoint
// server.use('*', (req, res, next) => {
//   // res.json({ message: 'catch all endpoint!' });
//   res.sendFile(paths.index_path());
// });
//

// ==============================================
// -React way (continued):
//
// -Catch-all that just sends back index.html.
// -This is to allow React Routing to work!
// -The root route (/) serving index.html
//  at the React Routing root route
//  works without the catch-all endpoint below.
server.get('*', (req, res) => {
  // res.send('<h1>success</h1>');
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// ==============================================

module.exports = server;
