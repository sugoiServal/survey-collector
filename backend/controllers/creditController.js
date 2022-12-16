const UserModel = require('../models/userModel')
const mongoose = require('mongoose')
 
const creditTopUp = async (user_id, amount) => {

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw 'invaild user_id for paid credit! TODO'
    }
    const user = await UserModel.findOneAndUpdate(
        {_id :user_id},
        {$inc : {'credits' : amount*10}})

    if (!user) {
        throw 'non-exist user_id for paid credit! TODO'
    }

    
}

module.exports = { creditTopUp }

