const {Cart, Product, User} = require('../models/models');

const cartController = {
    addtocart: async (req, res) => {
        try{
            const isCart = await Cart.findOne({$and: [{cus_id: req.body.cus_id}, { product_id: req.body.product_id}]});
            const product = await Product.findOne({_id: req.body.product_id});
            var price = product.price;
            if(isCart){
                var quantityy = isCart.quantity;
                var quantityyy = quantityy + 1;
                newtotal = price * quantityyy;
                await isCart.updateOne({$set:{quantity: quantityyy, total: newtotal}});
                res.status(200).json('Thêm thành công');
            }else{
                const newCart = new Cart({
                    product_id: req.body.product_id,
                    cus_id: req.body.cus_id,
                    quantity: req.body.quantity,
                    total: price * req.body.quantity
                })
                const saveCart = await newCart.save();
                res.status(200).json(newCart);
            }
        }catch(err){
            res.status(500).json(err);
        }
    },
    removecart: async(req, res) => {
        try{
            const isCart = await Cart.findOne({$and: [{cus_id: req.body.cus_id}, { product_id: req.body.product_id}]});
            await isCart.deleteOne();
            res.status(200).json('Xóa thành công');
        }catch(err){
            res.status(500).json(err);
        }
    },
    removeallcart: async(req, res) => {
        try{
            const isCart = await Cart.deleteMany();
            res.status(200).json('Xóa thành công');
        }catch(err){
            res.status(500).json(err);
        }
    },
    getcart: async(req, res) => {
        try{
               const isCart = await Cart.find({cus_id: req.params.id})
               var a = await Cart.aggregate([
                    { "$addFields": { "productid": { "$toObjectId": "$product_id" }}},
                    {
                        $lookup:{
                            from: "products",
                            localField: "productid",
                            foreignField: "_id",
                            as: "detail_product"
                        },
                     
                    },
                    {
                        $match: {
                          cus_id: req.params.id,
                        }
                    },
                    // {
                    //     $project: {
                    //       "detail_product.name": 1
                    //     }
                    // }
                ])
                res.status(200).json(a)
        }catch(err){
            res.status(500).json(err);
        }
    } 
};

module.exports = cartController