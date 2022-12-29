const utils = require("../utils/index.js");

let methods = {
  UploadFile: async (req, res) => {
    try {
      console.log("uplaode file controller called");
      let file = req.files;
      if (!file) throw " File Not found !";
      let cloudStorageType = process.env.CLOUD_STORAGE_TYPE;
      if (!cloudStorageType) throw "No cloud storage type found !";

      //   console.log("file is --->", file);

      if (cloudStorageType.toLowerCase() == "cloudinary") {
        let uploadFile = await utils.uploadFileToCloudinary(file[0]);
      }

      if (cloudStorageType.toLowerCase() == "amazonbucket") {
        let uploadFile = utils.uploadFileToS3(file);
      }
      if (cloudStorageType.toLowerCase() == "ftps") {
        let uploadFile = utils.uploadFileToFtp();
      }

      res.status(200).json({
        msg: "file uplaoded succsessfully !",
      });
    } catch (error) {
      console.log("error --> ", error);
      res.status(500).json({
        msg: "~~ can not uplaod File !~",
        error: error,
      });
    }
  },
};

module.exports = methods;
