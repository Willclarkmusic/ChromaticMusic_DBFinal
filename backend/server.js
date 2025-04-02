// Citation for the following module:
// Date: 2/24/2025
// Copied from:
// https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8321;

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.static("dist"));

app.use("/api/customers", require("./routes/customerRoute.js"));
app.use("/api/departments", require("./routes/departmentRoute.js"));
app.use("/api/employees", require("./routes/employeeRoute.js"));
app.use("/api/invoices", require("./routes/invoiceRoute.js"));
app.use("/api/products", require("./routes/productRoute.js"));
app.use("/api/invoicesProducts", require("./routes/invoiceProductRoute.js"));

const os = require("os");
const e = require("express");
const hostname = os.hostname();

app.listen(PORT, "0.0.0.0", () => {
  // flip server should automatically match whatever server you're on
  console.log(`From server.js Server running:  http://${hostname}:${PORT}...`);
});
