const router = require('express').Router();
const { User } = require('./db');

router.use('/google', require('./oauth'));

router.get('/me', (req, res, next) => {
  if (!req.user) {
    res.sendStatus(404);
  } else {
    res.json(req.user);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(401).send('User not found');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect password');
    } else {
      req.login(user, (err) => {
        if (err) next(err);
        res.json(user);
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => {
      if (err) next(err);
      else res.json(user);
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) next(err);
    res.sendStatus(204);
  });
});

module.exports = router;
