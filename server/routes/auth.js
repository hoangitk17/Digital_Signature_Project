const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

// Đăng nhập cho web thường
router.post("/signin", authController.signIn);
// Đăng nhập cho trang quản trị
router.post("/signinAdmin", authController.signInAdmin);
router.get("/getPublicKeyServer", authController.getPublicKeyRSA);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
