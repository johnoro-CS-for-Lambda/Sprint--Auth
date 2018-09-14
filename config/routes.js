const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');
const { authenticate } = require('./middlewares');
const secret = require('../_secrets/keys').jwtKey;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(id, name) {
  const options = {
    expiresIn: '1h',
    subject: String(id)
  };
  return jwt.sign({ id, name }, secret, options);
};

function register(req, res) {
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ 
      message: 'A username and password are required.' 
    }).end();
  }
  password = bcrypt.hashSync(password, 10);
  db('users').insert(req.body)
    .then(([ id ]) => {
      const token = generateToken(id, username);
      res.status(201).json({ token });
    })
    .catch(err => res.status(500).json({ error: 'Registering error' }));
}

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ 
      message: 'A username and password are required.' 
    }).end();
  }
  db('users').where({ username }).first()
    .then(user => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ 
          message: 'An incorrect username and/or password was provided.' 
        }).end();
      }
      const token = generateToken(user.id, username);
      res.status(200).json({ token });
    })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
