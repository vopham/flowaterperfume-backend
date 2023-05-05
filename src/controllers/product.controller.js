const {Product} = require('../models/models');
const ObjectId = require('mongoose').Types.ObjectId;

const productController = {
    //add
    addProduct: async(req, res) => {
        try{
            const newProduct = new Product(req.body);
            const saveProduct = await newProduct.save();
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
    // getbysex
    getBysex: async(req, res) => {
        try{
            const product = await Product.find({sex: req.params.key})
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
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
    //findName
    findName: async(req, res) => {
        try{
            const product = await Product.find({
                "$or":[
                    {name: {$regex: new RegExp(req.params.key, 'i')}}
                ]
            });
            res.status(200).json(product);
        }catch(err){
            res.status(500),json(err);
        }
    },
    //updateproduct
    updateProduct: async(req, res) => {
        try{
            const id = req.params.id;
            const product = await Product.findById(id.trim().toString());
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