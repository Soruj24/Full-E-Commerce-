const { handelUserCreate, handelGetAllUsers, handelSignal, handelUpdateUser, handelDeleteUser } = require("../controller/userConreoller");
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const { runValidation } = require("../validator/index");
const { validationUserRegister } = require("../validator/userValidator");

const userRouter = require("express").Router();


userRouter.post("/register", validationUserRegister, runValidation, handelUserCreate)
userRouter.get('/', isLoggedIn, isAdmin, handelGetAllUsers)
userRouter.get('/:id', isLoggedIn, isAdmin, handelSignal)
userRouter.put("/:id", isLoggedIn, isAdmin, handelUpdateUser)
userRouter.delete("/:id", isLoggedIn, isAdmin, handelDeleteUser)

module.exports = userRouter