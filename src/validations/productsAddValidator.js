const {check,body} = require("express-validator");

module.exports = [
    check("name")
      .notEmpty()
      .withMessage("el nombre de producto es obligatorio").bail()
      .isLength({
        min : 5,
        max : 20
      }).withMessage("el nombre debe tener entre 5 y 20 caracteres"),

    check("category")
      .notEmpty()
      .withMessage("la categoria del producto es obligatorio"),
    
   body("img")
      .custom((value,{req}) => {
       /*  if(req.files?.length){
          return true
        }else{
          return false
        } */

        if(req.file){
          return true
        }else{
          return false
        }
        /* return !!req.file */
      })
      .withMessage("la imagen del producto es obligatorio")
      .custom((value,{req}) => {
        const regImg = /(.jpg|.png|.jpeg|.webp)$/
     /*    req.files?.forEach(file => {
          if(regImg.test(file.filename)){ 
            return true
          }else{
            return false
          }
        }) */
        if(regImg.test(req.file?.filename)){ 
          return true
        }else{
          return false
        }
        /*return !!regImg.test(req.file?.filename) */
      })
      .withMessage("formato invalido")
      ,

    check("color")
      .notEmpty()
      .withMessage("el color del producto es obligatorio"),

    check("description")
      .notEmpty()
      .withMessage("la descripcion del producto es obligatorio"),

    check("price")
      .notEmpty()
      .withMessage("el precio del producto es obligatorio")
      .isNumeric({
         no_symbols: true
      }).withMessage("solo números positivos"),
]