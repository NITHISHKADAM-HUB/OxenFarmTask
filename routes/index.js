const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth');


router.get('/', checkNotAuthenticated, (req, res) => res.render('home'));


router.get('/index', checkAuthenticated, (req, res) =>
    res.render('index', {
        user: req.user
    })
);

module.exports = router;
