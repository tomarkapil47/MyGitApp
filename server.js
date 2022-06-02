const mongoose = require("mongoose");
const express = require("express");
const app = express();
const EmployeeRoute = require("./route/route");
const bodyParser = require("body-parser");
const morgan = require("morgan");
mongoose.connect("mongodb://localhost:27017/imgdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database Is established");
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/upload", express.static("upload"));
app.use("/api/employee", EmployeeRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is runnign on port ${PORT}`);
});

