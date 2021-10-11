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

// -Redirect to HTTPS version on Heroku when user
//  enters URL as:
//  1on1programming.com
// -Works without this if user explicity enters:
//  https://www.1on1programming.com
// -Heroku article explaining how to
//  "use https for all requests":
//  https://help.heroku.com/J2R1S4T8/can-heroku-force-an-application-to-use-ssl-tls
if (server.get('env') === 'production') {
  const enforce = require('express-sslify');
  server.use(enforce.HTTPS({ trustProtoHeader: true }));
}

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
