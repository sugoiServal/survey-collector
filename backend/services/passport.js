const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
require('dotenv').config();
const mongoose = require('mongoose')
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
            console.log('passport.js -- user.id', user.id);   // mongo ID
            console.log('passport.js -- user.uid', user.uid);  // Google ID
            console.log('passport.js -- user.credits', user.credits);  // credits
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
            console.log('passport.js -- user.id', user.id);   // mongo ID
            console.log('passport.js -- user.uid', user.uid);  // facebook ID
            console.log('passport.js -- user.authType', user.authType);  // Google ID
            console.log('passport.js -- user.credits', user.credits);  // credits
            cb(null, user)
        }
    }
));






// user.id is mongoDB _id
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser(async function(id, cb) {
    const user = await userModel.findById(id)
    cb(null, user);
});
