const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: String,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  volume: String,
  descripsion: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
});
const categorySchema = new Schema({
  name: String,
  image: String,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
});
const customerSchema = new Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  pass: String,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: Date,
  updatedAt: Date
});

let Product = mongoose.model('Product', productSchema);
let Category = mongoose.model('Category', categorySchema);
let Customer = mongoose.model('Customer', customerSchema);
module.exports = {Customer, Product, Category};
 