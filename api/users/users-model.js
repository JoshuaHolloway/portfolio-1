const db = require('../../data/db-config');

// ==============================================

function findBy(filter) {
  return (
    db('users as u')
      // .join('roles as r', 'u.role', '=', 'r.id')
      // .select('u.id', 'u.username', 'r.name as role', 'u.password')
      .where(filter)
  );
}

// ==============================================

function getAllUsers() {
  return db('users');
}

// ==============================================

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db('users').insert(user, [
    'user_id',
    'username',
    'password',
  ]);
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

// ==============================================

module.exports = {
  getAllUsers,
  insertUser,
  findBy,
};
