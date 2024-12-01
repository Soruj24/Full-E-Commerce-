const createHttpError = require("http-errors");
const User = require("../model/User"); // Import the User model
const { successResponse } = require("./responesController"); // Assuming this function is defined elsewhere for success responses
const { createUser, deleteUser, findItem } = require("../services/userServeices");
const { default: mongoose } = require("mongoose");

// User creation handler
const handelUserCreate = async (req, res, next) => {
    try {

        const newUser = await createUser(req.body)

        // Send a success response
        return successResponse(res, {
            statusCode: 201,
            message: "User created successfully",
            payload: {
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    address: newUser.address,
                    image: newUser.image,
                },
            },
        });

    } catch (error) {
        next(error);
    }
};


const handelGetAllUsers = async (req, res, next) => {

    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ],
        };

        const option = { password: 0 };

        const users = await User.find(filter, option)
            .limit(limit)
            .skip((page - 1) * limit);

        const count = await User.find(filter).countDocuments();

        if (!users) throw createError(404, "no users found");

        return successResponse(res, {
            statusCode: 200,
            message: "users were returned Successfully",
            payload: {
                users,
                pagination: {
                    totalPage: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 < Math.ceil(count / limit) ? page + 1 : null,
                },
            },
        });

    } catch (error) {
        next(error)
    }
}

const handelSignal = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await findItem(id)
        if(!user){
            throw createHttpError(404,"user not fount")
        }


        // Send a success response
        return successResponse(res, {
            statusCode: 201,
            message: "Signal User returned successfully",
            payload: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

const handelUpdateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        await findItem(id)

        // Prepare updates from the request body
        const updates = {};
        for (let key in req.body) {
            if (["name", "password", "phone", "address"].includes(key)) {
                updates[key] = req.body[key];
            } else if (key === "email") {
                throw createHttpError(400, "You can't update the email");
            }
        }

        // Define update options
        const updateOptions = { new: true, runValidators: true };

        // Perform the update
        const updatedUser = await User.findByIdAndUpdate(id, updates, updateOptions);
        if (!updatedUser) throw createHttpError(404, "User with this ID not found");

        // Send a success response
        return successResponse(res, {
            statusCode: 200,
            message: "User updated successfully",
            payload: {
                user: updatedUser,
            },
        });
    } catch (error) {
        next(error);
    }
};


const handelDeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await findItem(id)

        const user = await deleteUser(id)


        // Send a success response
        return successResponse(res, {
            statusCode: 200,
            message: "User updated successfully",
            payload: {
                user
            },
        });

    } catch (error) {
        next(error)
    }
}


// Export the handler function
module.exports = {
    handelUserCreate,
    handelGetAllUsers,
    handelSignal,
    handelUpdateUser,
    handelDeleteUser
};
