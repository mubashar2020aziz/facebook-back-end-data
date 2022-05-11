const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

//update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('account has been updated');
    } catch (err) {
      return res.status(501).json(err);
    }
  } else {
    return res.status(403).json('you can only updata your account');
  }
});
//delete user

// get a user
// follow a user
//unfollow a user

module.exports = router;
