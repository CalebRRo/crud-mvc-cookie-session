'use strict';
const productsDB = require("../../data/products.json")
const products = [
  {
name : "admin",
createdAt : new Date()
  },
  {
    name : "user",
    createdAt : new Date()
      },
    
        
]
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Products',products, {});
   
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Products', null, {});
     
  }
}