import userModel from '../models/user.model.js';

export const createUser = async (email, fullname, password) => {
    if (!email || !fullname || !password) {
        throw new Error('All fields are required');
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password: hashPassword,
        fullname
    });

    return user;
};
