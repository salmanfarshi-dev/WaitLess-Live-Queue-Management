
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`WaitLess Server is running on port ${PORT}`);
});

// Handle server errors
server.on("error", (error) => {
  console.error("Server Error:", error.message);
});
