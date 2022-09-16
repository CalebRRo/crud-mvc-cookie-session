const {loadUsers, storeUsers} = require('../data/db');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = {
    register : (req,res) => {
        return res.render("register", {title:"Registro"})
      },
      processRegister : (req,res) => {
        
        
          const {name,email,password,surname} = req.body;
          let users = loadUsers();
          /* return res.send(users) */
          let newUser = {
            id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name : name?name?.trim():"",
            surname : surname?surname?.trim():"",
            email : email?.trim(),
            password : bcryptjs.hashSync(password,12),
            rol : 'user',
            avatar : req.file ? req.file.filename : "avatar.png",
          }
          
          let usersModify = [...users, newUser];
          
          storeUsers(usersModify);
          
          return res.redirect('/users/login');
      
        
      },
      
  
      login : (req,res) => {
        return res.render("login", {title:"login"})
      },
    
      processLogin : (req,res) => {
      let errors = validationResult(req);
    
          let {id,name,rol,avatar} = loadUsers().find(user => user.email === req.body.email);
    
          req.session.userLogin = {
            id,
            name,
            rol,
            avatar     
          };
       
          
       return res.redirect("/users/profile")  
      
   
      },
        /* PROFILE */
  profile : (req,res) => {

    let user = loadUsers().find(user =>user.id === req.session.userLogin.id)
    
    return res.render('profile',{
        title: 'Profile',
        user
  
    })
},
    
}