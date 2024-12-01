const { handelUserCreate, handelGetAllUsers, handelSignal, handelUpdateUser, handelDeleteUser } = require("../controller/userConreoller");
const checkValidationResult = require("../validator");
const { validationUser } = require("../validator/userValidator");

const userRouter = require("express").Router();


userRouter.post("/register", validationUser, checkValidationResult, handelUserCreate)
userRouter.get('/', handelGetAllUsers)
userRouter.get('/:id', handelSignal)
userRouter.put("/:id", handelUpdateUser)
userRouter.delete("/:id", handelDeleteUser)

module.exports = userRouter