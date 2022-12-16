const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({    
    uid: {
        type: String,
        required: true,
        unique: true
      },
    credits: {
        type: Number,
        require: true
    },
    authType: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
})

// userSchema.statics.signupPw = async (email, password) => {
//     // ! validate request email/pw




//     // ! exist in db?  
//     const exist = await this.findOne({authType:"password", email})
//     // ! exist  just sign user in instead of error
//     if (exist) {
//         throw Error('email already in use')
//     }

//     // ! Not exist, signup
//     if (!validator.isStrongPassword(password)) {
//         throw Error('Password is not strong enough')
//     }
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)

//     const user = await this.create({email, password: hash})
// }

// const createToken = (_id) => {
//     return jwt.sign(
//         {_id:_id, },      // payload
//         process.env.JWT_SECRET,
//         {expiresIn: '30d'}
//     )
// }

// userSchema.statics.signinPw = async () => {
//     // ! validate request email/pw
//     if (!email || !password) {
//         throw Error('All fields must be filled')
//     }

//     const user = await this.findOne({email})
//     if (!user) {
//         throw Error('Incorrect email')
//     }

//     const hashMatch = await bcrypt.compare(password, user.password)
//     if(!match) {
//         throw Error('Incorrect password')
//     }
//     const JWTtoken = createToken(user._id)
//         (try catch block)
//     res.status(200).json({email, token})
// }

module.exports = mongoose.model('User', userSchema)
