const createHttpError = require("http-errors");
const User = require("../model/User");
const { default: mongoose } = require("mongoose");

const createUser = async (item) => {
    try {

        const { name, email, password, phone, address } = item

        // Check if the user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            throw createHttpError(409, "User with this email already exists");
        }

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password,
            phone,
            address,
        });


        await newUser.save();

        return newUser


    } catch (error) {
        throw new Error(error)
    }
}

const deleteUser = async (id) => {
    try {

        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser) {
            throw createHttpError(404, "user not delete")
        }
        return deleteUser

    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createHttpError(400, "Invalid User ID format");
        }
    }
}

const findItem = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return createHttpError(404, "User not found");
        }

        return user

    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createHttpError(400, "Invalid User ID format");
        }
    }
}





module.exports = { createUser, deleteUser, findItem }