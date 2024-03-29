const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router
  .route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    users.login
  );

// router.get('/logout', users.logout);
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Cya!');
    res.redirect('/campgrounds/?page=1');
  });
});

module.exports = router;
