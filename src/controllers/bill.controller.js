const {Cart, Product, User, Bill} = require('../models/models');

const billController = {
    getbill: async(req, res) => {
        try{
            const isBill = await Bill.findOne({cus_id: req.body.cus_id});
            if(isBill){
                var a = await Cart.aggregate([
                    {
                        $group: {
                            _id: '$cus_id',
                            totalprice:{$sum: '$total'}
                        }
                    }
                ])
                const index = a.findIndex(item => item._id === isBill.cus_id);      
                var b = a[index].totalprice
                await isBill.updateOne({$set:{totalprice: b}})
                res.status(200).json(isBill);
            }else{
                const newBill = new Bill({
                    cus_id: req.body.cus_id,
                })
                const saveBill = await newBill.save();
                res.status(200).json(newBill);
            }
        }catch(err){
            res.status(500).json(err);
        }
    } 
};

module.exports = billController