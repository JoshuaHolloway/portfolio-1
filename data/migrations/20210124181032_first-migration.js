exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 200).notNullable();
      users.string('password', 200).notNullable();
      // users.string('role', 200).notNullable(); // TODO: Change to be stored in a seperate table
      users.timestamps(false, true);
    })
    .createTable('quotes', (quotes) => {
      quotes.increments('quote_id');
      quotes.string('quote', 425).notNullable();
      quotes.string('attributed_to', 50);
      quotes.string('submitted_by', 50);
      quotes.integer('vote_up').unsigned();
      quotes.integer('vote_down').unsigned();
    });
};

// ==============================================

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('quotes').dropTableIfExists('users');
};
