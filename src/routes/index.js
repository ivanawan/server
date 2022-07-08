const express = require('express');
const router = express.Router();
const auth_route=require('./auth-route');
const book_route=require('./book');
const transaction= require('./transaction');

router.use('/auth',auth_route);
router.use('/book',book_route);
router.use('/transaction',transaction);

module.exports=router;