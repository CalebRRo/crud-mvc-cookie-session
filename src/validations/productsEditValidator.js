const {check,body} = require("express-validator");

module.exports = [
    check("name")
      .notEmpty()
      .withMessage("el nombre de producto es obligatorio").bail()
      .isLength({
        min : 2,
        max : 25
      }).withMessage("el nombre debe tener entr 5 y 20 caracteres"),

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
    ]