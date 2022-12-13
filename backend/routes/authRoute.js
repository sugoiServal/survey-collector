const express = require('express')
const passport = require('passport')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')


// ? for test only
router.get('/test', 
    (req, res) => {
        const user = {"aa": '123'}
        console.log(typeof user)
        res.json(user)
    }
)

router.get('/get_user', requireAuth,
    (req, res) => {
        var user = req.user
        if (user === undefined) {
            user = {ok: false}
        } else {
            user = {ok: true, ...user}
        }
        res.json(user)
    }
)

// ! google oauth
router.get('/google', 
    passport.authenticate('google', {
        scope:['profile']
    })
)

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(`${process.env.FRONT_URL}/surveys`)
    }
);

// ! Facebook
router.get('/facebook', 
    passport.authenticate('facebook')
)

router.get('/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(`${process.env.FRONT_URL}/surveys`)
    }
);

// logout
router.get('/logout', (req, res) => {
    req.logout()
    res.send(req.user)
})


module.exports = router