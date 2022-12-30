const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors({ origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/testing", (req, res) => {
  res.send("testing");
});
app.use("/", routes);

app.listen(3002, (err) => {
  if (err) console.log(`errorr is ${err}`);
  console.log(`server is running on port 3002`);
});
