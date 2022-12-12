const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' });
    }
    const _id = req.user._id

  try {
    const user = await User.findOne({ _id })
    if (!(user.googleId === req.user.googleId)) {
      throw 'req googleId mismatch with record in database'
    }
    console.log("auth OK");
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth