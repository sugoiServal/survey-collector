const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    console.log('TODO!! fix require Auth')
    // verify user is authenticated
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' });
    }
    const _id = req.user._id
    const authType = req.user.authType

    try {
      const user = await User.findOne({ _id, authType})
      if (!user || !(user.uid === req.user.uid)) {
        throw 'No record OR requst uid mismatch with uid in database!!'
      }
      next()

    } catch (error) {
      console.log(error)
      res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth