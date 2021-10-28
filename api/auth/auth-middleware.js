const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config/secrets');

// ==============================================

const restricted = (req, res, next) => {
  // the server expects to find the token in the request header Authorization
  const token = req.headers.authorization; // req.headers.authorization is set even though Authorization:abcdef is sent as header when making request.

  if (token) {
    // async verify (with old-school node async callback style)
    // -callback is used to handle success or failure
    jwt.verify(token, TOKEN_SECRET, (err, decoded_token) => {
      if (err) {
        next({ status: 401, message: `token bad: ${err.message}` });
      } else {
        // -Assume the token is valid and move along!
        req.decodedJwt = decoded_token;
        next();
      }
    });
  } else {
    next({ status: 401, message: 'we wants token!' });
  }
};

// ==============================================

const checkAuthPayload = (req, res, next) => {
  const { username, password } = req.body;
  const valid = Boolean(username && password && typeof password === 'string');

  if (valid) {
    next();
  } else {
    next({
      status: 422,
      message:
        'Please provide username and password and the password shoud be alphanumeric',
    });
  }
};

// ==============================================

module.exports = { checkAuthPayload, restricted };
