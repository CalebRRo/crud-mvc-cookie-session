const {check,body} = require("express-validator");

module.exports = [
    check("name")
      .notEmpty()
      .withMessage("el nombre de producto es obligatorio").bail()
      .isLength({
        min : 5,
        max : 20
      }).withMessage("el nombre debe tener entre 5 y 20 caracteres"),
    check('price')
      .notEmpty()
      .withMessage('El precio es requerido').bail()
      .isNumeric({
          no_symbols: true
      }).withMessage('Solo números positivos'),
    check("category")
      .notEmpty()
      .withMessage("la categoria del producto es obligatorio"),
    check("description")
      .notEmpty()
      .withMessage("la descripcion del producto es obligatorio"),
    body("image")
      .custom((value,{req}) => {
        if(req.file){
          return true
        }else{
          return false
        }
      })
      .withMessage("la imagen del producto es obligatorio")
      .custom((value,{req}) => {
        const regImg = /(.jpg|.png|.jpeg|.webp)$/
        if(regImg.test(req.file?.filename)){ 
          return true
        }else{
          return false
        }
      })
      .withMessage("formato invalido")
      ,

]