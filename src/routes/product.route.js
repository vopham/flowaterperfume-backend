const productController = require('../controllers/product.controller');

const router = require('express').Router();
//add
router.post('/createproduct', productController.addProduct);

//get all
router.get('/getall', productController.getAllproduct);

//find one by id
router.get('/:id', productController.findOne);

//update product
router.put('/:id', productController.updateProduct);

//deleteproduct
router.delete('/:id', productController.deleteProduct);

module.exports = router;