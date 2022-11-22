const express = require('express')
const passport = require('passport')

const router = express.Router()

// ? for test only
router.get('/test', 
    (req, res) => {
        res.json('test route')
    }
)

router.get('/test_user', 
    (req, res) => {
        res.send(req.user)
    }
)

router.get('/google', 
    passport.authenticate('google', {
        scope:['profile']
    })
)

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' })
);

router.get('/logout', (req, res) => {
    req.logout()
    res.send(req.user)
})


module.exports = router