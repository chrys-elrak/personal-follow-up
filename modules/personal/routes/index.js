const router = require('express').Router();
const AuthRoute = require('./auth');
const PesronalRoute = require('./personal');
const passport = require('passport');

router.use('/auth', AuthRoute);

// Secured route
router.use('/', passport.authenticate('jwt', { session: false }),  [PesronalRoute]);

module.exports = router;