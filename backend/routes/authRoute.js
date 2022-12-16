const express = require('express')
const passport = require('passport')
const router = express.Router()
const { signinUser } = require('../controllers/passwordAuthController')
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
        console.log(user)
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

// ! github
router.get('/github', 
    passport.authenticate('github', { scope: [ 'user:email' ] }));

// the API is intentionally exposed to the Oauth service provider 
router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(`${process.env.FRONT_URL}/surveys`)
    }
);

router.get('/github/webhook', express.json(),
    (req, res) => {
        console.log(req.body)
    }
);

// ! password
router.post('/password', express.json(), signinUser)

// logout
router.post('/logout', (req, res) => {
    req.logout()
    res.send(req.user)
})


module.exports = router