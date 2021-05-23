const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageUploader = multer({ dest: 'images/' }); // (**)


const userController = require('../app/controllers/UserController');

router.get('/listuser', userController.getListUser);
router.get('/:id', userController.getListUserById);
router.get('/images/:name', userController.getImageSign);
router.put('/image-sign/:id', imageUploader.single('image'), userController.updateImageSign);
router.put('/get-link-image-from-file', imageUploader.single('image'), userController.getLinkImageSign);
router.post('/signup', userController.signUp);
router.get('/exists/:slug', userController.exists);
router.post('/getUserInfoByPublicKey', userController.getUserInfoByPublicKey);

module.exports = router;
