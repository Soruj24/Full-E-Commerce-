const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./secret");


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
