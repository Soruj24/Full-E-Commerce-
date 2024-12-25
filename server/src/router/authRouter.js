const { handelLogIn, handelLogOut, handelRefreshToken, handelProtected } = require("../controller/authController");
const { isLoggedOut, isLoggedIn } = require("../middleware/auth");
const { runValidation } = require("../validator/index");
const { validateUserLogin, validateRefreshToken } = require('../validator/userValidator')

const authRouter = require("express").Router();

authRouter.post('/login', isLoggedOut, validateUserLogin, runValidation, handelLogIn)
authRouter.post('/logout', isLoggedIn, handelLogOut)
authRouter.get('/refresh-token', handelRefreshToken)
authRouter.get('/protected', handelProtected)



module.exports = authRouter