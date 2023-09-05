const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GithubStrategy = require('passport-github2').Strategy
const bodyParser = require("body-parser");
const passport = require('passport')
require('dotenv').config();
const userModel = require('../models/userModel') 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
    },

    async (accessToken, refreshToken, profile, cb) => {
        const uid = profile.id
        const user = await userModel.findOne({uid, authType:'google'})
        if (!user) {
            try {
                const user = await userModel.create({
                    uid,
                    credits: 0,
                    authType:'google'
                })
                console.log('user created')
                cb(null, user)
            } catch (error) {
                console.log('cant not create user')
                cb(error, null)
            }
        } else {
            console.log('user exist');
            cb(null, user)
        }
    }
));

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        const uid = profile.id
        const user = await userModel.findOne({uid,  authType:'facebook'})
        if (!user) {
            try {
                const user = await userModel.create({
                    uid,
                    credits: 0,
                    authType:'facebook'
                })
                console.log('user created')
                cb(null, user)
            } catch (error) {
                console.log('cant not create user')
                cb(error, null)
            }
        } else {
            console.log('user exist');
            cb(null, user)
        }
    }
));


passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    },

    async (accessToken, refreshToken, profile, cb) => {
        const uid = profile.id
        const user = await userModel.findOne({uid, authType:'github'})
        if (!user) {
            try {
                const user = await userModel.create({
                    uid,
                    credits: 0,
                    authType:'github'
                })
                console.log('user created')
                cb(null, user)
            } catch (error) {
                console.log('cant not create user')
                cb(error, null)
            }
        } else {
            console.log('user exist');
            cb(null, user)
        }
    }
));




// serialize once when the auth success first time, and serialized data stored inside the cookie session
    // subsequent user access only involves deserialization

passport.serializeUser(function(userDoc, cb) {
    // user is the userModel object
    cb(null, 
        // ? this doc is the info that's stored in the session cookie(after serialized)
        {                           
            id : userDoc._id
        });
});
  
passport.deserializeUser(async function(user, cb) {
    const userDoc = await userModel.findById(user.id)
    cb(null, userDoc);
});
