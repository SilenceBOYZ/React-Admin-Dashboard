const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "public/img/uploads/userImages/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    return cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
})

const uploadUserImage = multer({storage: storage});
module.exports = uploadUserImage;