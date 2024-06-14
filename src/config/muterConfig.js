const path = require("path");
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "public/img/uploads/itemImages");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    return cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
})

const upload = multer({storage: storage});
module.exports = upload;