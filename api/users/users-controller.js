const usersModel = require('./users-model');

// ==============================================

const getUsers = async (req, res) => {
  res.json(await usersModel.getAllUsers());
};

// ==============================================

const postUser = async (req, res) => {
  res.status(201).json(await usersModel.insertUser(req.body));
};

// ==============================================

module.exports = {
  getUsers,
  postUser,
};
