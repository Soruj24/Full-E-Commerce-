const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const userRouter = require("./router/userRouter");
const { errorResponse } = require("./controller/responesController");
const createError = require('http-errors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/user', userRouter)


//route  error handler
app.use((req, res, next) => {
    next(createError(404, "route not found"));
});

// server err handler
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
});




module.exports = app