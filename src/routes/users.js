const express = require('express');
const router = express.Router();

const {login, register,processRegister,processLogin,profile,logout} = require("../controllers/userController");
const {registerValidator, loginValidator} = require('../validations');
const {uploadImageUser} = require("../middlewares/upLoadFiles");

const userSessionCheck = require('../middlewares/userSessionCheck');

/* user. */
router

      /* USERS-REGISTER */
     .get('/register', register)
     .post('/register',uploadImageUser.single("images"), registerValidator, processRegister)

      /* USERS-lOGIN */
     .get('/login', login)
     .post('/login', loginValidator,  processLogin)

     /* USER PROFILE */
     .get('/profile',userSessionCheck, profile)
     .get("/logout", logout)
     

module.exports = router;
