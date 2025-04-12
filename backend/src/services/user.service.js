const userModel = require('../models/user.model');

module.exports.createUser = async (email, fullname, password) => {
    if(!email || !fullname || !password){
        throw new Error('All fields are required')
    }

    const hashPassword = await userModel.hashPassword(password)

    const user = await userModel.create({
        email,
        password:hashPassword,
        fullname
    })

    return user
}