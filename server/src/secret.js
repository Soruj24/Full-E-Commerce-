require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || " mongodb://localhost:27017/yourdb"
const jwtAccessKey = process.env.ACCESS_TOKEN_SECRET || "56756u458674605439urtrty8t345j489439i454iut497t84054tkrt34"
const jwtRefreshKey = process.env.REFRESH_TOKEN_SECRET || "f8rut4908t3-4054it87-60=35o343ri3948774353845893584TI95UTIGJIR"


module.exports = {
    PORT,
    mongoURI,
    jwtAccessKey,
    jwtRefreshKey
}