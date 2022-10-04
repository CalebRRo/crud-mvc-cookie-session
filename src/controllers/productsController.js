const db = require("../database/models")
const {loadProducts, storeProducts} = require("../data/productsModule")
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fs = require("fs");
const { validationResult } = require("express-validator");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		db.Product.findAll({
			include : ["images"]
		})
		.then(products => res.render("products",{
			products,
			toThousand
		}))
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic

		db.Product.findByPk(req.params.id,{
			include: ["images"]
		})
		.then(product => res.render("detail",{
			product,
			toThousand
		}))
		.catch(error => console.log(error))
	},

	// Create - Form to create
	add: (req, res) => {
		// Do the magic
		db.Category.findAll({
			attributes : ["id","name"],
			order : ["name"]
		})
		.then(categories =>{
			return res.render("product-create-form",{
				categories
			})
		})
		.catch(error => console.log(error))
		
	},
	
	// Create -  Method to store
	store: (req, res) => {
	/* 	const errors = validationResult(req);
		if (errors.isEmpty()) {
		// Do the magic
		const {name,price,discount,description,category} = req.body
		const products = loadProducts()

		const newProduct = {
			id : (products[products.length - 1].id + 1),
			name : name.trim(),
			description : description.trim(),
			price : +price,
			discount : +discount,
			image : req.file ? req.file.filename : "default-image.png",
			category
		}

		const productsModify = [...products, newProduct];
		storeProducts(productsModify);

		return res.redirect("/products");
	} else {
		return res.render("product-create-form", {
		  errors: errors.mapped(),
		  old: req.body,
		});
	  } */
	  
	  db.Product.create({
		...req.body,
		name : req.body.name.trim(),
		description : req.body.description.trim()
	  })
	  .then(product => {
		if(req.files.length){
			let images = req.files.map(({filename}) => {
                return {
					file : filename,
					productId : product.id
				}
			})
			db.Image.bulkCreate(images,{
				validate : true
			}).then((result) => console.log(result))
		}
		return res.redirect("/products")
	  })
	  .catch(error => console.log(error))
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const products = loadProducts()
		const product = products.find(product => product.id === +req.params.id);
		return res.render("product-edit-form",{
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const errors = validationResult(req);
		if (errors.isEmpty()) {
		const {name,price,discount,category,description} = req.body
	    const productsModify = products.map(product => {
			if (product.id === +req.params.id) {
				return {
					...product,
					name : name.trim(),
					price : +price,
					discount : +discount,
					description : description.trim(),
					category
				}
			}
			return product
		})
		storeProducts(productsModify);
		
		return res.redirect("/products/detail/" + req.params.id)
	} else {
		return res.render("product-edit-form",{
		  product: req.body,
		  id: req.params.id,
		  errors: errors.mapped(),
		});
	  }
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const {id} = req.params;
		const products = loadProducts();
		const productsModify = products.filter(product => product.id !== +id);
		storeProducts(productsModify);
		return res.redirect("/products");
	}
};

module.exports = controller;