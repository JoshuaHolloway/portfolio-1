require('dotenv').config();

const server = require('./api/server');

// ==============================================

const { PORT } = require('./config');

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
