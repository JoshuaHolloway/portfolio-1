const db = require('../../data/db-config');
const Users = require('./users-model');

// ==============================================

test('it is the correct environment for the tests', () => {
  expect(process.env.NODE_ENV).toBe('testing');
  // expect(true).not.toBe(false);
  // throw new Error('flip!');
});

// ==============================================

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

// ==============================================

beforeEach(async () => {
  await db.seed.run();
});

// ==============================================

describe('Users db access functions', () => {
  // --------------------------------------------

  describe('Users.getAll()', () => {
    // - - - - - - - - - - - - - - - - - - - - -

    it('resolves to all users in the users table', async () => {
      const users = await Users.getAllUsers();
      expect(users.length).toBe(2);
    });

    // - - - - - - - - - - - - - - - - - - - - -

    it('resolves to the correct user shape', async () => {
      const users = await Users.getAllUsers();
      expect(users[0]).toHaveProperty('user_id');
      expect(users[0]).toHaveProperty('username', 'josh');

      expect(users[0]).toMatchObject({ user_id: 1, username: 'josh' });
      expect(users[1]).toMatchObject({ user_id: 2, username: 'homer' });
    });

    // - - - - - - - - - - - - - - - - - - - - -
  });

  // --------------------------------------------

  describe('Users.insertUser()', () => {
    // - - - - - - - - - - - - - - - - - - - - -
    it('adds a new user to the table', async () => {
      await Users.insertUser({
        username: 'steve',
        password: '1234',
      });
      const rows = await db('users');
      expect(rows).toHaveLength(3);
    });
    // - - - - - - - - - - - - - - - - - - - - -
    it('resolves to the newly inserted hobbit', async () => {
      const newUser = await Users.insertUser({
        username: 'steve',
        password: '1234',
      });
      expect(newUser).toMatchObject({ username: 'steve', password: '1234' });
    });

    // - - - - - - - - - - - - - - - - - - - - -
  });

  // --------------------------------------------
});

// ==============================================
