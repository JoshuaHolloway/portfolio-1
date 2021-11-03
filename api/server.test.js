const request = require('supertest');
// const db = require('../data/dbConfig');
const db = require('../data/db-config');

const server = require('./server');

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

afterAll(async () => {
  await db.destroy();
});

// ==============================================

describe('[GET /users', () => {
  // --------------------------------------------
  // it('should return a 200 OK status', async () => {
  //   const res = await request(server).get('/api/users');
  //   expect(res.status).toBe(200);
  // });
  // --------------------------------------------
  // it('should return JSON', async () => {
  //   const res = await request(server).get('/api/users');
  //   console.log(res.header);
  //   expect(res.type).toBe('application/json');
  // });
  // --------------------------------------------
  // it('should return a list of users', async () => {
  //   const res = await request(server).get('/api/users');
  //   console.log(res.body);
  //   expect(res.body).toHaveLength(2);
  // });
  // --------------------------------------------
});

// ==============================================

describe('[POST] /users', () => {
  // --------------------------------------------

  it('should return a 422 if no name in payload', async () => {
    // const res = await request(server).post('/api/users').send({});
    // expect(res.status).toBe(422);
  });

  // --------------------------------------------

  it('should return a 201 OK status', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({ username: 'josh2', password: '1234' });
    expect(res.status).toBe(201);
  });

  // --------------------------------------------

  const timeout = 100; // ms.
  it(
    'responds with the newly created user',
    async () => {
      const res = await request(server)
        .post('/api/users')
        .send({ username: 'josh2', password: '1234' });
      console.log(res.body);
      expect(res.body).toMatchObject({
        // user_id: 3,
        username: 'josh2',
        password: '1234',
      });
    },
    timeout
  );

  // --------------------------------------------
});

// ==============================================
