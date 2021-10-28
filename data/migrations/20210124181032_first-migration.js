exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 200).notNullable();
      users.string('password', 200).notNullable();
      users.timestamps(false, true);
    })
    .createTable('quotes', (users) => {
      users.increments('quote_id');
      users.string('quote', 200).notNullable();
    });
};

// ==============================================

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('quotes').dropTableIfExists('users');
};
