const express = require('express');
const router = express.Router();
const db = require('./data/db-config');

// ==============================================

function getAllUsers() {
  return db('users');
}

// ==============================================

function getAllQuotes() {
  return db('quotes');
}

// ==============================================

function update_vote(id, value) {
  // knex('accounts')
  //   .where('userid', '=', 1)
  //   .increment('balance', 10)
  // Outputs:
  // update `accounts` set `balance` = `balance` + 10 where `userid` = 1
  return db('quotes').where('quote_id', '=', id).increment('vote_up', value);
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
    'attributed_to',
    'submitted_by',
    'vote_up',
    'vote_down',
  ]);
  return newQuoteObject;
}

// ==============================================

// [GET] /api/josh
router.get('/josh', (req, res) => {
  res.json({ message: 'josh. GET' });
});

// ==============================================

// [POST] /api/josh
router.post('/josh', (req, res) => {
  const body = req.body;

  res.json({ message: body.message });
});

// ==============================================

// [GET] /api/users
router.get('/users', async (req, res) => {
  res.json(await getAllUsers());
});

// ==============================================

// [POST] /api/users
router.post('/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body));
});

// ==============================================

// [GET] /api/quotes
router.get('/quotes', async (req, res) => {
  const quotes = await getAllQuotes();
  console.log('[GET] /api/qoutes -> quotes: ', quotes);

  res.status(201).json(quotes);
});

// ==============================================

// [POST] /api/quotes
router.post('/quotes', async (req, res) => {
  console.log('[POST] /api/quotes -> req.body: ', req.body);

  await insertQuote(req.body);
  const all_quotes = await getAllQuotes();

  res.status(201).json(all_quotes);
  // res.status(201).json({ message: 'HI!' });
});

// ==============================================

// [PUT] /api/quotes
router.put('/quotes/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    await update_vote(id, 1);
    const table = await getAllQuotes();
    console.log('table: ', table);
    res.json(table);
  } catch (err) {
    next(err);
  }
});

// ==============================================

module.exports = router;
