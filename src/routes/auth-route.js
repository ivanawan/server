const express = require('express');
const router = express.Router();
const userController= require('../controllers/authController');
const joi = require('../middlewares/joi-middleware');
const auth= require('../middlewares/auth');


router.post('/login',joi('login'), userController.login);
router.post('/register',joi('register'),userController.register);
router.patch('/',auth(),userController.update);
router.get('/profile',auth(),userController.getProfile);


module.exports =router;