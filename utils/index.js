var cloudinary = require("cloudinary").v2;

var formidable = require("formidable");

let methods = {
  configCloudinary: () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECERET,
    });
    return cloudinary;
  },

  uploadFileToS3: () => {},

  uploadFileToCloudinary: (file) => {
    let fileExtension = file.mimetype.split("/").pop();

    fileExtension = fileExtension.toUpperCase();

    let fileType = methods.findFileType(fileExtension);

    if (fileType === "Image") {
      //   console.log("fileis -->", file);
      console.log("file type is image ");
      var CloudinaryObj = methods.configCloudinary();
      CloudinaryObj.uploader
        .upload(file.filepath)
        .then((result) => console.log(`result is `, result))
        .catch((err) => {
          for (var i in err) {
            console.log("error is ", err[i]);
          }
          // console.log(`error is ${err}`);
        });
    }
    if (fileType === "Video") {
      //   console.log("fileis -->", file);
      console.log("file type is video ");
      var CloudinaryObj = methods.configCloudinary();
      CloudinaryObj.uploader
        .upload(file.filepath, { resource_type: "video" })
        .then((result) => console.log(`result is `, result))
        .catch((err) => {
          for (var i in err) {
            console.log("error is ", err[i]);
          }
          // console.log(`error is ${err}`);
        });
    }

    if (fileType === "Other") {
    }
  },

  uploadFileToFtp: () => {},

  findFileType: (fileExtension) => {
    console.log(`file extension is ${fileExtension}`);
    let imagesFileExtensions = new Set([
      "JPEG",
      "PNG",
      "GIF",
      "TIFF",
      "PSD",
      "PDF",
      "EPS",
      "AI",
      "INDD",
      "RAW",
    ]);

    let videoFileExtensions = new Set([
      "MP4",
      "MOV",
      "WMV",
      "AVI",
      "AVCHD",
      "FLV",
      "F4V",
      "SWF",
      "MKV",
      "WEBM",
      "HTML5",
      "MPEG-2",
    ]);

    var fileType = "Other";

    if (imagesFileExtensions.has(fileExtension) === true) {
      console.log(`extension is ${fileExtension}`);
      fileType = "Image";
    }
    if (videoFileExtensions.has(fileExtension) === true) {
      fileType = "Video";
    }

    return fileType;
  },

  //Cloudinary multiple files uplaod

  uploadImageToCloudinaryStorage: async (file) => {
    cloudinary.uploader
      .upload(file)
      .then((result) => console.log(`result is `, result))
      .catch((err) => {
        for (var i in err) {
          console.log("error is ", err[i]);
        }
        // console.log(`error is ${err}`);
      });
  },

  uploadVideoToCloudinaryStorage: async () => {},

  uplaodOtherFileToCloudinaryStorage: async () => {},

  attachBodyAndFiles: (req, res, next) => {
    console.log("Attach File Function Called");
    let form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: "General Middleware File Handling Error",
          err,
        });
      }

      req.files = [];
      for (const key in files) {
        if (files.hasOwnProperty(key)) {
          const element = files[key];
          req.files.push(element);
        }
      }
      req.body = fields;
      next();
    });
  },

  //End
};

module.exports = methods;
