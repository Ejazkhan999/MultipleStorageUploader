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
// cloudinary.config({
//   cloud_name: "dr93dv5qy",
//   api_key: "836564686949554",
//   api_secret: "MhP8xdjFcCU4K4NtGfeOBGNMTp0",
// });

// cloudinary.uploader
//   .upload("sample.pdf")
//   .then((result) => console.log(`result is `, result))
//   .catch((err) => {
//     for (var i in err) {
//       console.log("error is ", err[i]);
//     }
//     // console.log(`error is ${err}`);
//   });

app.listen(3002, (err) => {
  if (err) console.log(`errorr is ${err}`);
  console.log(`server is running on port 3002`);
});
