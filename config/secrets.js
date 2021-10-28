// -This is an intermediary between other code
//  and environment variables.
module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'shh',
};
