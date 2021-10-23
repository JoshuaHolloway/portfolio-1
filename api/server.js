const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db-config');

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

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// ==============================================

server.get('/josh', (req, res) => {
  res.json({ message: 'josh. GET' });
});

// ==============================================

server.post('/josh', (req, res) => {
  const body = req.body;

  res.json({ message: body.message });
});

// ==============================================

server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers());
});

// ==============================================

server.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body));
});

// ==============================================

server.get('/api/quotes', async (req, res) => {
  res.status(201).json(await getAllQuotes());
});

// ==============================================

server.post('/api/quotes', async (req, res) => {
  console.log('[POST] /api/quotes -> req.body: ', req.body);

  res.status(201).json(await insertQuote(req.body));
  // res.status(201).json({ message: 'HI!' });
});

// ==============================================

module.exports = server;
