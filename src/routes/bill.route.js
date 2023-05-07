const billController = require('../controllers/bill.controller');

const router = require('express').Router();

router.post('/getbill',billController.getbill);

router.get('/getallbill', billController.getallbill);

router.put('/:id',billController.updateBill);

router.post('/:id', billController.deleteBill);

module.exports = router;