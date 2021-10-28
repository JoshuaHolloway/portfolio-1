const router = require('express').Router();

const db = require('../../data/db-config');

// ==============================================

function getAllUsers() {
  return db('users');
}

function getAllQuotes() {
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

async function insertQuote(quote) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newQuoteObject] = await db('quotes').insert(quote, [
    'quote_id',
    'quote',
  ]);
  return newQuoteObject;
}

// ==============================================

router.get('/josh', (req, res) => {
  res.json({ message: 'josh. GET' });
});

// ==============================================

router.post('/josh', (req, res) => {
  const body = req.body;

  res.json({ message: body.message });
});

// ==============================================

router.get('/api/users', async (req, res) => {
  res.json(await getAllUsers());
});

// ==============================================

router.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body));
});

// ==============================================

router.get('/api/quotes', async (req, res) => {
  res.status(201).json(await getAllQuotes());
});

// ==============================================

router.post('/api/quotes', async (req, res) => {
  console.log('[POST] /api/quotes -> req.body: ', req.body);

  res.status(201).json(await insertQuote(req.body));
  // res.status(201).json({ message: 'HI!' });
});

// ==============================================

module.exports = router;
