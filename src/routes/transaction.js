const express = require('express');
const router = express.Router();
const transaction= require('../controllers/transactionController'); 
const auth= require('../middlewares/auth');
const isAdmin= require('../middlewares/isadmin');
const joi = require('../middlewares/joi-middleware');

router.get('/',isAdmin(),transaction.getAll);
router.post('/',auth(),joi('transaction'),transaction.insert);
router.post('/notification',transaction.notification);
// router.post('/',transaction.insert);


module.exports =router;