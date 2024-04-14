const express = require('express');
const { isProduction } = require('../../config/keys');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.json({
    message: 'GET /api/csrf'
  })
});

if ( !isProduction ) {
    router.get('/restore', (req,res,next)=> {
        res.status(200).json({
            'CSRF-Token' : req.csrfToken()
        })
    })

}

module.exports = router;
