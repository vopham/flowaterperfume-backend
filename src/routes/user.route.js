const userController = require('../controllers/user.controller');
const middlewareController = require('../controllers/middleware.controller');

const router = require('express').Router();
//add
router.post('/register', userController.registerUser);
//login
router.post('/login', userController.loginUser);
//logout
router.post('/logout', middlewareController.verifyToken, userController.logoutUser);
//get all
router.get('/getall',middlewareController.verifyToken, middlewareController.isAdmin,  userController.getAllUser);

//find one by id
router.get('/:id', userController.findOne);

//update user
router.put('/:id', userController.updateUser);

//deleteproduct
router.delete('/:id', userController.deleteUser);

module.exports = router;
