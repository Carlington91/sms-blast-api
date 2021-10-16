const multer = require('multer');

exports.imageUpload = (folder, type, fileFieldName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // cb(null, file.fieldname + '-' + uniqueSuffix);
      cb(null, file.originalname);
    },
  });

  let upload;

  if (type === 'single') {
    upload = multer({ storage }).single(fileFieldName);
  } else if (type === 'array') {
    upload = multer({ storage }).array(fileFieldName);
  }
  return upload;
};
