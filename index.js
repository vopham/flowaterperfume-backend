const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const $ = require('jquery');


const productRoute = require('./src/routes/product.route');
const userRoute = require('./src/routes/user.route');
const categoryRoute = require('./src/routes/category.route');
const cartRoute = require('./src/routes/cart.route');
const billRoute = require('./src/routes/bill.route');
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
app.use('/category', categoryRoute);
app.use('/user',userRoute);
app.use('/cart', cartRoute);
app.use('/bill', billRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});