const mongoose = require("mongoose");
const { mongoURI } = require("../secret");

const connectDB = async () => {
  try {
    if (!mongoURI) {
      throw new Error("Mongo URI not defined in environment variables.");
    }

    // Enable mongoose debugging (Optional, useful during development)
    mongoose.set("debug", true);


    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected successfully!");

  } catch (err) {
    // Catch connection errors and log them
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }

  // Connection events for monitoring
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established successfully.");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected.");
  });
};

// Reconnect on server restart
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB disconnected due to application termination.");
  process.exit(0);
});

module.exports = connectDB;
