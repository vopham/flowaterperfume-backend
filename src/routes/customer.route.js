const customerController = require('../controllers/customer.controller');

const router = require('express').Router();
//add
router.post('/register', customerController.registerCustomer);
//login
router.post('/login', customerController.loginCustomer);
//get all
router.get('/getall', customerController.getAllcustomer);

//find one by id
router.get('/:id', customerController.findOne);

//update customer
router.put('/:id', customerController.updateCustomer);

//deleteproduct
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;