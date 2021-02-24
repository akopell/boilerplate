const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('./db');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    // Google will send back the token and profile
    async (token, refreshToken, profile, done) => {
      // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
      try {
        const [user] = await User.findOrCreate({
          where: {
            email: profile.emails[0].value,
            googleId: profile.id,
          },
        });
        if (user.dataValues) {
          done(null, user.dataValues);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

// Google authentication and login (GET /auth/google)
router.get('/', passport.authenticate('google', { scope: 'email' }));

// handles the callback after Google has authenticated the user (GET /auth/google/callback)
router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home', // or wherever
    failureRedirect: '/', // or wherever
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = router;
