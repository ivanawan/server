const express = require('express');
const router = express.Router();
const userController= require('../controllers/authController');
const joi = require('../middlewares/joi-middleware');
const auth= require('../middlewares/auth');
const {uploadImage}= require('../middlewares/uploadImage');

router.post('/login',joi('login'), userController.login);
router.post('/register',joi('register'),userController.register);
router.get('/profile',auth(),userController.getProfile);
router.post('/profile',uploadImage('avatar'), auth(),joi('update') ,userController.updateProfile);


module.exports =router;