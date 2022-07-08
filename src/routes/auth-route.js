const express = require('express');
const router = express.Router();
const userController= require('../controllers/authController');
const joi = require('../middlewares/joi-middleware');

router.post('/login',joi('login'), userController.login);
router.post('/register',joi('register'),userController.register);
router.patch('/',userController.update);


module.exports =router;