// ! imports
require('dotenv').config();
const {testSend} = require('./services/sendgrid')
const express = require('express');
require('./services/passport');
const mongoose = require('mongoose')
const cors = require("cors")
const session = require('cookie-session')
const passport = require('passport')

// router
const authRoutes = require('./routes/authRoute')
const creditRoutes = require('./routes/creditRoute')
const surveyRoutes = require('./routes/surveyRoute')

// ! server setup
// create express app
const app = express()
// testSend()
// middlewares
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials:true
})) 


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
app.use('/api/credit', creditRoutes)
app.use('/api/surveys', surveyRoutes)
//! random tests

// console.log(mongoose.Types.ObjectId.isValid('6387c8627848c76b042945c6'));

// ! listen
app.listen(process.env.PORT, ()=>{
    console.log(`listenin ${process.env.PORT}!!`);
})