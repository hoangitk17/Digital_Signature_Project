const express = require('express');
const router = express.Router();

const billController = require('../app/controllers/BillController');

router.post('/create', billController.create);
router.get('/list', billController.getBills);
module.exports = router;
