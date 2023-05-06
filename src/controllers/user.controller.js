const {User, Product} = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {
    //register
    registerUser: async(req, res) => {
        const email = req.body.email
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.pass, salt);
        User.findOne({
            email: email
        })
        .then(data =>{
            if(data){
                res.json('Email đã tồn tại');
            }else{
                const newUser = new User({
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address,
                    email: req.body.email,
                    pass: hashed,
                    admin: req.body.admin
                });
                 
                // if(req.body.product){
                //     const product = Product.findById(req.body.product);
                //     product.updateOne({$push: {products: saveUser._id}});
                // }
                const saveUser = newUser.save();
                res.status(200).json(newUser);
            }
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    },
    //login
    //function TOKEN
    generateAccesstoken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.SECRET_KEY,
            {expiresIn: "365d"}
          );
    },
    // generateRefreshtoken: (user) => {
    //     return jwt.sign(
    //         {
    //             id: user.id,
    //             admin: user.admin,
    //         },
    //         process.env.REFRESH_SECRET_KEY,
    //         {expiresIn: "365d"}
    //       )
    // },
    loginUser: async(req, res) => {
        try{    
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(404).json('Sai email!');
            }
            const validPass = await bcrypt.compare(req.body.pass, user.pass);
            if(!validPass){
                return res.status(404).json('Sai mật khẩu');
            }
            if(user && validPass){
              const accessToken = userController.generateAccesstoken(user);
            //   const refreshToken = userController.generateRefreshtoken(user);
                res.cookie('accessToken', accessToken,{
                httpOnly: true,
                path: '/',
                sameSite: 'strict'
              });
            //   kh trả pass ra
                const {pass, ...others} = user._doc;
                res.status(200).json({...others, accessToken});
               
            }
        }catch(err){
            res.status(500).json(err);
        }
    },
    //refreshtoken
    // reqRefreshToken: async(req, res) => {
    //     const refreshToken = req.cookies.refreshToken;
    //     if(!refreshToken) return res.status(401).json("Bạn cần đăng nhập");
    //     jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         const newAccessToken = userController.generateAccesstoken(user);
    //         const newRefreshToken = userController.generateRefreshtoken(user);
    //         res.cookie('refreshToken', newRefreshToken,{
    //             httpOnly: true,
    //             path: '/',
    //             sameSite: 'strict'
    //           });
    //           res.status(200).json({accessToken: newAccessToken});
    //     })
    // },
    //logout
    logoutUser: async(req, res) => {
        res.cookie('accessToken', '')
        res.send({
            message:'Logout thành công'
        });
    },
     //getall
     getAllUser: async(req, res) => {
        try{
            const user = await User.find()
            res.status(200).json(user);
        }catch(err){
            res.status(500),json(err);
        }
    },
    //findonebyid
    findOne: async(req, res) => {
        try{
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //updateUser
    updateUser: async(req, res) => {
        try{
            const user = await User.findById(req.params.id);
            await user.updateOne({$set: req.body});
            res.status(200).json('Updated successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    },
    deleteUser: async(req, res) => {
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            await user.updateOne({$set: req.body});
            res.status(200).json('Deleted successfully!');
        }catch(err){
            res.status(500).json(err);
        }
    },
};

module.exports = userController;