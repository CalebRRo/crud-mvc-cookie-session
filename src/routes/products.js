// ************ Require's ************
const express = require('express');
const router = express.Router();

const {productsAddValidator,productsEditValidator} = require("../validations")


// ************ Middlewares Require ************

const {uploadImageProduct} = require("../middlewares/uploadFiles")
const adminUserCheck = require("../middlewares/adminUserCheck")

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create',adminUserCheck, productsController.add); 
router.post('/create',uploadImageProduct.single("image"), productsAddValidator, productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/',productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id',adminUserCheck, productsController.edit); 
router.put('/update/:id',productsEditValidator, productsController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy);


module.exports = router;
