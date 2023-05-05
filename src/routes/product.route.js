const productController = require('../controllers/product.controller');
const middlewareController = require('../controllers/middleware.controller');

const router = require('express').Router();
//add
router.post('/createproduct',middlewareController.verifyToken, productController.addProduct);

//get all
router.get('/getall', productController.getAllproduct);
// find by sex
router.get('/getbysex/:key', productController.getBysex);
//find by name
router.get('/search/:key', productController.findName);

//find one by id
router.get('/:id', productController.findOne);

//update product
router.put('/:id',middlewareController.verifyToken, productController.updateProduct);

//deleteproduct
router.delete('/:id',productController.deleteProduct);

module.exports = router;