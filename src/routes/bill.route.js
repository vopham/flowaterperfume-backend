const billController = require('../controllers/bill.controller');

const router = require('express').Router();

router.get('/getbill',billController.getbill);

router.get('/getallbill', billController.getallbill);

router.put('/:id',billController.updateBill);

module.exports = router;