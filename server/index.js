require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')

const app = express();

app.use(express.json());

const PORT = 4000
const { CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
  })
);

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});