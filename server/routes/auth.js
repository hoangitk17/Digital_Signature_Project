const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post("/signin", authController.signIn);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
