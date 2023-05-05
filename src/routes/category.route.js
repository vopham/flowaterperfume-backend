const categoryController = require('../controllers/category.controller');
const middlewareController = require('../controllers/middleware.controller');

const router = require('express').Router();
//add
router.post('/createcategory', categoryController.addCategory);

//get all
router.get('/getall', categoryController.getAllcategory);
//findcategory
router.get('/:key', categoryController.getCategory);
//find one by id
router.get('/:id', categoryController.findOne);

//update category
router.put('/:id', categoryController.updateCategory);

//deletecategory
router.delete('/:id',middlewareController.verifyToken, categoryController.deleteCategory);

module.exports = router;