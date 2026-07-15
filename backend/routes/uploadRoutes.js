const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload({ useTempFiles: true }));
router.route('/').post(protect, admin, uploadImage);

module.exports = router;
