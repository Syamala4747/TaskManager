const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db"); // Import MongoDB connection
const taskRoutes = require("./routes/taskroutes");


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/tasks", taskRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
