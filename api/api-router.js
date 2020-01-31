const express = require('express')

const Recipes = require('./recipe-model')

const db = require('../data/dbConfig')
const secrets = require('../config/secrets.js');

const router = express.Router()

router.post('/register', (req, res) => {
    const credentials = req.body;
  
    const hash = bcrypt.hashSync(credentials.password, 10)
  
    credentials.password = hash;
  
    db('users').insert(credentials)
    .then(reply => {
      res.json({uid: reply[0]})
    })
    .catch(err => {
      res.json({message: err})
    })
});
  
router.post('/login', (req, res) => {
    const credentials = req.body;
    const username = credentials.username;
  
    db('users').where({username}).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
 
        res.status(200).json({
          message: `Hey ${user.username}! Here's a token...`,
          token,
        });
      } else {
        res.status(401).json({ message: 'You shall noooot paaaass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
    };
  
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options);
  }

module.exports = router;