const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post("/signin", authController.signIn);
router.get("/getPublicKeyServer", authController.getPublicKeyRSA);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
