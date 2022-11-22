const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
require('dotenv').config();
const mongoose = require('mongoose')
const userModel = require('../models/userModel') 

// auth: setup google API for OAuth
// passport setup
    // Google OAuth API: console.developers.google.com



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
    },

    async (accessToken, refreshToken, profile, cb) => {
        const googleId = profile.id
        const user = await userModel.findOne({googleId})
        if (!user) {
            try {
                const user = await userModel.create({googleId})
                console.log('user created')
                cb(null, user)
            } catch (error) {
                console.log('cant not create user')
                cb(error, null)
            }
        } else {
            console.log('user exist');
            console.log(user.id);
            console.log(user.googleId);
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
