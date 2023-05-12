const {Cart, Product, User, Bill} = require('../models/models');

const billController = {
    getbill: async(req, res) => {
        try{    const data = req.body
                const items = data.bill_items;
                var totalprice = 0;
                var totalquantity = 0;
                for(let i=0; i< items.length; i++){
                    totalprice += items[i].total;
                    totalquantity += items[i].quantity;
                } 
                
                 const bill_items = items.map(item => ({ 
                    name_product: item.detail_product[0].name,
                    price: item.total,
                    quantity: item.quantity
                 }))
                 const newBill = new Bill({
                    cus_id: req.body.cus_id,
                    name_order: req.body.name_order,
                    phone_order: req.body.phone_order,
                    address_order: req.body.address_order,
                    bill_items: bill_items,
                    total_quantity: totalquantity,
                    total_price: totalprice
                })
                const saveBill = await newBill.save();              
                res.status(200).json(newBill);  
         
        }catch(err){
            res.status(500).json(err);
        }
    },
    getallbill: async(req, res) => {
        try{
            const bill = await Bill.find()
            res.status(200).json(bill);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getonebill: async(req, res) => {
        try{
            const bill = await Bill.findOne({cus_id: req.body.cus_id})
            res.status(200).json(bill);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateBill: async(req, res) => {
        try{
            const bill = await Bill.findById(req.params.id);
            await bill.updateOne({$set: req.body});
            res.status(200).json('Updated successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteBill: async(req, res) => {
        try{
            const bill = await Bill.findByIdAndDelete(req.params.id);
            await bill.updateOne({$set: req.body});
            res.status(200).json('Deleted successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    },
};

module.exports = billController