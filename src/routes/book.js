const express = require('express');
const router = express.Router();
const bookController= require('../controllers/bookController'); //change 
const joi = require('../middlewares/joi-middleware');
const auth= require('../middlewares/auth');

const {uploadFile}= require('../middlewares/uploadFile');

router.get('/',bookController.getAll);
router.get('/:id',auth(),bookController.getOne);
router.post('/',uploadFile(),auth(),joi('book'), bookController.insert);
router.get('/:id/:book',bookController.download);

router.patch('/:id',bookController.update);
router.patch('/:id',bookController.destroy);

module.exports =router;