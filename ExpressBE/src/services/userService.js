const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        // create user in mongoDB
        let result = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: "user"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        // fetch user by email
        const user = await User.findOne({ email: email });
        if (user) {
            // compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return {
                    EC: 0,
                    EM: "Login successfully",
                    data: user
                }
            } else {
                return {
                    EC: 2,
                    EM: "Email/Password is incorrect",
                }
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password is incorrect",
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService, loginService
}