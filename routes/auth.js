const router = require('express').Router();
const User = require('./../models/Users');
const bcrypt = require('bcrypt');

//register

router.post('/register', async (req, res) => {
  try {
    //gen password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword,
    });

    //save user and  response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login

router.post('/login', async (req, res) => {
  //  use model User
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json('user not found');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json('password not match');

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
