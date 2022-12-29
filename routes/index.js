const express = require("express");
const router = express.Router();
const utils = require("../utils/index.js");
const fileUploaderController = require("../controller/fileUploader.controller.js");

router.post(
  "/file/uploadfile",
  utils.attachBodyAndFiles,
  fileUploaderController.UploadFile
);

module.exports = router;
