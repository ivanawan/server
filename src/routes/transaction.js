const express = require('express');
const router = express.Router();
const transaction= require('../controllers/transactionController'); //change 
const auth= require('../middlewares/auth');

router.get('/',transaction.getAll);
router.post('/',auth(),transaction.insert);
router.post('/notification',transaction.notification);
// router.post('/',transaction.insert);


module.exports =router;