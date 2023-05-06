const {Cart, Product, User, Bill} = require('../models/models');

const billController = {
    getbill: async(req, res) => {
        try{
                const isBill = await Bill.findOne({cus_id: req.body.cus_id});
                var a = await Cart.aggregate([
                    {
                        $group: {
                            _id: '$cus_id',
                            totalprice:{$sum: '$total'}
                        }
                    }
                ])
                console.log(a[0].totalprice)
                var b = a[0].totalprice
                 const newBill = new Bill({
                    cus_id: req.body.cus_id,
                    totalprice: b
                })
                const saveBill = await newBill.save();              
                res.status(200).json(newBill);  
        }catch(err){
            res.status(500).json(err);
        }
    },
    // getbill: async(req, res) => {
    //     try{
    //         const isBill = await Bill.findOne({cus_id: req.body.cus_id});
    //         if(isBill){
    //             var a = await Cart.aggregate([
    //                 {
    //                     $group: {
    //                         _id: '$cus_id',
    //                         totalprice:{$sum: '$total'}
    //                     }
    //                 }
    //             ])
    //             const index = a.findIndex(item => item._id === isBill.cus_id);      
    //             var b = a[index].totalprice
    //             await isBill.updateOne({$set:{totalprice: b}})
    //             res.status(200).json(isBill);
    //         }else{
    //             const newBill = new Bill({
    //                 cus_id: req.body.cus_id,
    //             })
    //             const saveBill = await newBill.save();
    //             res.status(200).json(newBill);
    //         }
    //     }catch(err){
    //         res.status(500).json(err);
    //     }
    // },
    getallbill: async(req, res) => {
        try{
            const bill = await Bill.find()
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
};

module.exports = billController