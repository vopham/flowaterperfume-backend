const cartController = require('../controllers/cart.controller');
const middlewareController = require('../controllers/middleware.controller');

const router = require('express').Router();

router.post('/addtocart',middlewareController.isLogin, cartController.addtocart);

router.get('/getcart/:id',cartController.getcart);

router.post('/remove', cartController.removecart);
module.exports = router;