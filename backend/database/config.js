// Citation for the following code:
// Date: 2/24/2025
// Copied from:
// https://github.com/osu-cs340-ecampus/react-starter-app

// Get an instance of mysql we can use in the app
const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
  connectionLimit: 10,
  waitForConnections: true,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "your_default_password",
  database: process.env.DB_DATABASE || "ChromaticMusic",
  port: process.env.DB_PORT || 3000,
});

// Export it for use in our application
module.exports = { pool };
