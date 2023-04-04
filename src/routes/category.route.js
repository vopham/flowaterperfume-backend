const categoryController = require('../controllers/category.controller');

const router = require('express').Router();
//add
router.post('/createcategory', categoryController.addCategory);

//get all
router.get('/getall', categoryController.getAllcategory);

//find one by id
router.get('/:id', categoryController.findOne);

//update category
router.put('/:id', categoryController.updateCategory);

//deletecategory
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;