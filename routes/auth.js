const express = require('express');
const router = express.Router();
const passportGoogle = require('../helpers/google');

router.get('/google',
    passportGoogle.authenticate(
        'google',
        {
            scope: ['profile']
        }
    )
);

router.get('/google/callback', 
    passportGoogle.authenticate(
        'google',
        {
            failureRedirect: '/'
        }),
    (req, res) => {
        //console.log(req.user);
        res.redirect('/game');
    }
);

module.exports = router;