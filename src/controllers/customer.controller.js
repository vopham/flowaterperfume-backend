const {Customer, Product} = require('../models/models');

const customerController = {
    //register
    registerCustomer: async(req, res) => {
        const email = req.body.email
        Customer.findOne({
            email: email
        })
        .then(data =>{
            if(data){
                res.json('Email đã tồn tại');
            }else{
                const newCustomer = new Customer(req.body);
                const saveCustomer = newCustomer.save(); 
                if(req.body.product){
                    const product = Product.findById(req.body.product);
                    product.updateOne({$push: {products: saveCustomer._id}});
                }
                res.status(200).json(saveCustomer);
            }
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    },
    //login
    loginCustomer: async(req, res) => {
        const email = req.body.email
        const pass = req.body.pass

        Customer.findOne({
            email: email,
            pass: pass
        })
        .then(data => {
            if(data){
                res.json('Đăng nhập thành công')
                console.log(data);
            }else{
                res.json('Tài khoản hoặc mật khẩu không chính xác')
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
    },
     //getall
     getAllcustomer: async(req, res) => {
        try{
            const customer = await Customer.find();
            res.status(200).json(customer);
        }catch(err){
            res.status(500),json(err);
        }
    },
    //findonebyid
    findOne: async(req, res) => {
        try{
            const customer = await Customer.findById(req.params.id).populate('products');
            res.status(200).json(customer);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //updatecustomer
    updateCustomer: async(req, res) => {
        try{
            const customer = await Customer.findById(req.params.id);
            await customer.updateOne({$set: req.body});
            res.status(200).json('Updated successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    },
    //deletecustomer
    deleteCustomer: async(req, res) => {
        try{
            const customer = await Customer.findByIdAndDelete(req.params.id);
            await customer.updateOne({$set: req.body});
            res.status(200).json('Deleted successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    },

};

module.exports = customerController;