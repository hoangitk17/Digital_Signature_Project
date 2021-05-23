const express = require('express');
const router = express.Router();

const logController = require('../app/controllers/LogController');

router.post('/create', logController.create);
router.get('/list', logController.getLogs);
module.exports = router;
