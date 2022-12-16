const UserModel = require('../models/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// signin a user
const signinUser = async (req, res) => {
    const {email, password} = req.body
    console.log(password)
    try {
        if (!email || !password) {
            throw Error('All fields must be filled')
        }
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }
        var user = await UserModel.findOne({uid:email, authType:"password"}).lean()
    } catch(error) {
        res.status(400).json({error:error.message})
    }
    // signup
    if (!user) {
        try {
            console.log('try signup');
            if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
                throw Error('Password is not strong enough')
            } 
            const salt = await bcrypt.genSalt(10)
            const hashedPw = await bcrypt.hash(password, salt)
            await userModel.create(
                {
                    uid:email, 
                    password: hashedPw, authType:"password", 
                    credits: 0,
                })
            const user = await userModel.findOne(
                    {
                        uid:email, 
                        password: hashedPw, authType:"password", 
                        credits: 0,
                    }).select(["-password"])
            const JWTtoken = createToken(user._id)
            res.status(200).json({user, JWTtoken})
   
        } catch(error) {
            res.status(400).json({error:error.message})
        }
    }
    // login
    if (user) {
        try {     
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                throw Error('Incorrect password')
            }
            console.log('login success');
            const JWTtoken = createToken(user._id)
            delete user.password
            res.status(200).json({user, JWTtoken})
        } catch(error) {
            res.status(400).json({error:error.message})
        }
    }
}



module.exports = { signinUser }