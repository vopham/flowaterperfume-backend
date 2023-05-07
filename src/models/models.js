const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  volume: String,
  sex: Boolean,
  descripsion: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
});


const categorySchema = new Schema({
  name: String,
  image: String,
});


const userSchema = new Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  pass: String,
  image: String,
  admin: {
    type: Boolean,
    default: false
  },
  createdAt: Date,
  updatedAt: Date
});


const cartSchema = new Schema({
  cus_id: String,
  product_id: String,
  quantity:{
    type: Number,
    default: 0,
  },
  total:{
    type: Number,
    default: 0,
  }
});


const billSchema = new Schema({
  cus_id: String,
  name_order: String,
  phone_order: String,
  address_order: String,
  total_quantity: Number,
  bill_items:[{
    name_product: String,
    price: Number,
    quantity: Number
  }],
  status:{
    type: Boolean,
    default:  false
  },
  total_price:{
    type: Number,
    default: 0
  }
});
let Product = mongoose.model('Product', productSchema);
let Category = mongoose.model('Category', categorySchema);
let User = mongoose.model('User', userSchema);
let Cart = mongoose.model('Cart', cartSchema);
let Bill = mongoose.model('Bill', billSchema);
module.exports = {User, Product, Category, Cart, Bill};
 