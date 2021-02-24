const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const session = require('express-session');
const passport = require('passport');
const { db, User } = require('./db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbStore = new SequelizeStore({ db: db });
dbStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Best kept secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch(done);
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.use('/auth', require('./auth'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
