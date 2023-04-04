const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const productRoute = require('./src/routes/product.route');
const customerRoute = require('./src/routes/customer.route');
const categoryRoute = require('./src/routes/category.route');

// CONNECT DATABASE
// with mongodbcloud
// const URL = 'mongodb+srv://phamchauvo2:phamchauvo2@cluster0.zbqw8xc.mongodb.net/?retryWrites=true&w=majority'

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       URL,
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     console.log('Connected to mongoDB')
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }

// connectDB();
//with mongodbcompass
async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/flowater');
        console.log('Connect to database successfully!');
    }catch(error){
        console.log('Connect to database failed!');
    }
}

connectDB();
//

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));

//ROUTES

app.use('/product', productRoute);
app.use('/customer', customerRoute);
app.use('/category', categoryRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});