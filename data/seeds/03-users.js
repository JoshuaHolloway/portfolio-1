exports.seed = function (knex, Promise) {
  return knex('users').insert([
    {
      username: 'josh',
      password: '1234',
    },
    {
      username: 'homer',
      password: '1234',
    },
  ]);
};
