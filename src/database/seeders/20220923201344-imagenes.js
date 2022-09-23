'use strict';
const productsDB = require("../../data/images.json")
const images = [
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
    
     await queryInterface.bulkInsert('Images',images, {});
   
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Images', null, {});
     
  }
}
