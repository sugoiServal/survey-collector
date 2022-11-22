// ! imports
require('dotenv').config();
const express = require('express');
require('./services/passport');
const mongoose = require('mongoose')
const session = require('cookie-session')
const passport = require('passport')

// router
const authRoutes = require('./routes/authRoute')

// ! server setup
// create express app
const app = express()

// middlewares
app.use(express.json()) 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// middlewares: oauth cookie session
app.use(session({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 * 30 // 30 days
 }));

app.use(passport.initialize())
app.use(passport.session())


// connect to DB
console.log('connecting to Atlas')
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to Atlas');
    })
    .catch((error)=>{
        console.log(error);
    })



//! routes 

// ? for test only
app.get('/', (req, res)=>{
    res.json({mssg: 'welcome to the app'})
})

// auth routes
app.use('/auth', authRoutes)


// ! listen
app.listen(process.env.PORT, ()=>{
    console.log(`listenin ${process.env.PORT}!!`);
})