const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile models
const Profile = require('../../models/Profile');
// Load User models
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile routes
// @access  Public
router.get('/test', (req, res) => { res.json({msg: 'Profile works' })});

// @route   GET api/profile/test
// @desc    Tests profile routes
// @access  Public
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
