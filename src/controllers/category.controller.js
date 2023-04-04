const {Customer, Product, Category} = require('../models/models');

const categoryController = {
    //add
    addCategory: async(req, res) => {
        try{
            const newCategory = new Category(req.body);
            const saveCategory = await newCategory.save();
            if(req.body.product){
                const product = Product.findById(req.body.product);
                await product.updateOne({$push: {products: saveCategory._id}});
            }
            res.status(200).json(saveCategory);
        }catch(err){
            res.status(500).json(err);
        }
    },
     //getall
     getAllcategory: async(req, res) => {
        try{
            const category = await Category.find().populate('products');
            res.status(200).json(category);
        }catch(err){
            res.status(500),json(err);
        }
    },
    //findonebyid
    findOne: async(req, res) => {
        try{
            const category= await Category.findById(req.params.id);
            res.status(200).json(category);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateCategory: async(req, res) => {
        try{
            const category = await Category.findById(req.params.id);
            await category.updateOne({$set: req.body});
            res.status(200).json('Updated successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteCategory: async(req, res) => {
        try{
            const category = await Category.findByIdAndDelete(req.params.id);
            await category.updateOne({$set: req.body});
            res.status(200).json('Deleted successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = categoryController;