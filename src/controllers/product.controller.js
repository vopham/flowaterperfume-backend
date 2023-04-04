const {Product, Customer} = require('../models/models');

const productController = {
    //add
    addProduct: async(req, res) => {
        try{
            const newProduct = new Product(req.body);
            const saveProduct = await newProduct.save();
            if(req.body.category){
                const category = Caterogy.findById(req.body.category);
                await category.updateOne({$push: {category: saveProduct._id}});
            }
            res.status(200).json(saveProduct);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //getall
    getAllproduct: async(req, res) => {
        try{
            const product = await Product.find().populate('category');
            res.status(200).json(product);
        }catch(err){
            res.status(500),json(err);
        }
    },
    //findonebyid
    findOne: async(req, res) => {
        try{
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //updateproduct
    updateProduct: async(req, res) => {
        try{
            const product = await Product.findById(req.params.id);
            await product.updateOne({$set: req.body});
            res.status(200).json('Updated successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    },
    //deleteproduct
    deleteProduct: async(req, res) => {
        try{
            await Customer.updateMany({products: req.params.id}, {$pull: {products: req.params.id}});
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = productController;