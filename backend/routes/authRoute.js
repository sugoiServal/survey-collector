const express = require('express')
const passport = require('passport')

const router = express.Router()

// ? for test only
router.get('/test', 
    (req, res) => {
        const user = {"aa": '123'}
        console.log(typeof user)
        res.json(user)
    }
)

router.get('/get_user', 
    (req, res) => {
        var user = req.user
        if (user === undefined) {
            user = {ok: false}
        } else {
            user = {ok: true, ...user}
        }
        console.log(user)
        res.json(user)
    }
)

router.get('/google', 
    passport.authenticate('google', {
        scope:['profile']
    })
)

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/google' }),
    (req, res) => {
        res.redirect(`${process.env.FRONT_URL}/surveys`)
    }
);

router.get('/logout', (req, res) => {
    req.logout()
    res.send(req.user)
})


module.exports = router