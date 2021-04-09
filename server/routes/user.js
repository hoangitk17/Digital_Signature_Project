const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/listuser', userController.getListUser);
router.get('/:id', userController.getListUserById);
router.post('/image-sign/:id', userController.updateImageSign);
router.post('/signup', userController.signUp);
router.get('/exists/:slug', userController.exists);

module.exports = router;
