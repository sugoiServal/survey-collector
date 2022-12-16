const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// check through header

const sessionAuthStrategy = async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Authorization failed, you must log in!' });
    }
    const _id = req.user._id
    const authType = req.user.authType

    try {
      const user = await User.findOne({ _id, authType})
      if (!user || !(user.uid === req.user.uid)) {
        throw Error('No record OR requst uid mismatch with uid in database!!')
      }
      console.log('session auth success');
      next()

    } catch (error) {
      console.log(error)
      res.status(401).json({error:error.message})
    }
}
const JWTAuthStrategy = async (req, res, next) => {
  const { authorization } = req.headers
  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findOne({ _id }).select('-password')
    console.log('JWT auth success');
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

const requireAuth = async (req, res, next) => {
    // check auth type
    const { authorization } = req.headers
    if (!authorization) {
      await sessionAuthStrategy(req, res, next)
    }
    if (authorization) {
      await JWTAuthStrategy(req, res, next)
    }


}

module.exports = requireAuth