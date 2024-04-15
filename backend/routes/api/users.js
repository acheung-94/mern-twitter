const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const User = mongoose.model('User')
const passport = require('passport')
router.get('/', (req, res, next) => {
  res.json({
    message: 'GET /api/users'
  })
});

router.post('/register', async(req, res, next) => {
  //query db to make sure there isn't a user with either req.email OR req.username.
  const user = await User.findOne({
    $or: [{email:req.body.email}, {username: req.body.username}]
  })

  if (user) {
    const err = new Error('Validation Error');
    err.statusCode = 400;
    const errors = {};
    if (user.email == req.body.email){
      errors.email = "A user has already registered with this email."
    }
    if (user.username === req.body.username){
      errors.username = "A user has already registered with this username."
    }

    err.errors = errors
    return next(err)
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  })

  bcrypt.genSalt(10, (err,salt)=>{
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async(err, hashedPassword) =>{
      if (err) throw err;
      try{
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save()
        return res.json( {user} ) // return json object { user: userData }
      }
      catch(err){
        next(err)
      }
    })
  })
})

router.post( '/login', async (req, res, next) => {
  passport.authenticate('local', async (err, user) => { // the 'done' callback?
    if (err) return next(err)
    if (!user) {
      const err = new Error('Invalid Credentials');
      err.statusCode = 404;
      err.errors = { email: 'Invalid Credentials'}
      return next(err)
    } 
    //if user find is successful
    return res.json({ user })
  })(req, res, next)
})

module.exports = router;
