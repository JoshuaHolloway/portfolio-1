const router = require('express').Router();

const usersController = require('./users-controller');

const authMiddleware = require('../auth/auth-middleware');

// ==============================================

// [GET] /api/users
router.get('/', authMiddleware.restricted, usersController.getUsers);
// router.get('/', usersController.getUsers); // tests

// ==============================================

// [GET] /api/users/protected
router.get(
  '/protected',
  authMiddleware.restricted,
  usersController.protectedRoute
);

// ==============================================

// [POST] /api/users
router.post('/', usersController.postUser);

// ==============================================

// -Error handling middleware (user-router)
router.use((err, req, res, next) /* eslint-disable-line */ => {
  console.log(
    '**********\nerror handling middleware (users-router)\n**********'
  );
  res.status(err.status || 500).json({
    stack: err.stack,
    customMessage: 'something tragic inside users-router happened!',
    message: err.message,
  });
});

// ==============================================

module.exports = router;
