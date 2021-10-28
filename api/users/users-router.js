const router = require('express').Router();

const usersModel = require('./users-model');

// ==============================================

router.get('/api/users', async (req, res) => {
  res.json(await usersModel.getAllUsers());
});

// ==============================================

router.post('/api/users', async (req, res) => {
  res.status(201).json(await usersModel.insertUser(req.body));
});

// ==============================================

module.exports = router;
