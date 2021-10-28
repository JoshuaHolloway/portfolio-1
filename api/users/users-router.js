const router = require('express').Router();

const usersController = require('./users-controller');

// ==============================================

// [GET] /api/users
router.get('/', usersController.getUsers);

// ==============================================

// [POST] /api/users
router.post('/', usersController.postUser);

// ==============================================

module.exports = router;
