const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = require('../../config/secrets');

const authMiddleware = require('./auth-middleware');
const UsersModel = require('../users/users-model');

// ==============================================

function buildToken(user) {
  const payload = {
    userId: user.user_id,
    username: user.username,
    role: user.role,
  };

  console.log('buildToken payload: ', payload);

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, TOKEN_SECRET, options);
}

// ==============================================

router.post('/register', authMiddleware.checkAuthPayload, (req, res, next) => {
  let user = req.body;

  // bcrypting the password before saving
  const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
  const hash = bcrypt.hashSync(user.password, rounds);

  // never save the plain text password in the db
  user.password = hash;

  UsersModel.insertUser(user)
    .then((new_user) => {
      // new_user: { user_id: 7, username: 'foo', password: 'xxxxxxx' }
      res
        .status(201)
        .json({ message: `Great to have you, ${new_user.username}` });
    })
    .catch(next);
});

// ==============================================

router.post('/login', authMiddleware.checkAuthPayload, (req, res, next) => {
  let { username, password } = req.body;

  // -.findby searches for username
  //  via knex SQL .where( username: '<username-value>')
  UsersModel.findBy({ username }) // it would be nice to have middleware do this
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log(
          '[POST] /login -> UsersModel.findBy({ username }).then([user]) -> user: ',
          user
        );

        // -Note: Same as auth-1,
        //        but no session is started.
        // -Build the token!
        const token = buildToken(user);

        res.status(200).json({
          message: `Welcome back ${user.username}!`,
          token,
        });
      } else {
        next({ status: 401, message: 'Invalid Credentials' });
      }
    })
    .catch(next);
});

// ==============================================

// -Error handling middleware (auth-router)
router.use((err, req, res, next) /* eslint-disable-line */ => {
  console.log(
    '**********\nerror handling middleware (auth-router)\n**********'
  );
  res.status(err.status || 500).json({
    stack: err.stack,
    customMessage: 'something tragic inside auth-router happened!',
    message: err.message,
  });
});

// ==============================================

module.exports = router;
