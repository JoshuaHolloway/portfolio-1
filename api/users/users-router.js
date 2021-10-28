const router = require('express').Router();

const usersController = require('./users-controller');

// ==============================================

router.get('/api/users', usersController.getUsers);

// ==============================================

router.post('/api/users', usersController.postUserS);

// ==============================================

module.exports = router;
