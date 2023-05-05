const billController = require('../controllers/bill.controller');

const router = require('express').Router();

router.get('/getbill',billController.getbill);

module.exports = router;