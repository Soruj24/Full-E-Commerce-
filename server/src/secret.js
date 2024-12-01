require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || " mongodb://localhost:27017/yourdb"


module.exports = {
    PORT,
    mongoURI
}