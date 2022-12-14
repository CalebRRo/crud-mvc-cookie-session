const db = require("../database/models")
const {Op} = require("sequelize")


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic

      let inSale = db.Product.findAll({
		where : {
            discount : {
				[Op.gt] : 10
			}
		},
			include : ["images","category"]
		});
		let newest = db.Product.findAll({
			order : [["createdAt","DESC"]],
			limit : 4,
			include : ["images","category"]
		})
		let home = db.Category.findByPk(1,{
			include: [
				{
					association : "products",
					include : ["images"],
					limit : 4
				}
			]
		})
		Promise.all([inSale,newest, home])

		.then(([inSale,newest, home]) => {
			return res.render("index",{
				inSale,
				newest,
				home,
				toThousand
			}) 
		})
		.catch(error => console.log(error))

		
		
	},
	search: (req, res) => {
		// Do the magic
	/*  	const products = loadProducts();
		const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))	;

		return res.render("results",{
			products : result,
			keywords : req.query.keywords,
			toThousand
		})  */
	 	const {keywords} = req.query;

		db.Product.findAll({
			where : {
			[Op.or]: [
				{
					name : {
					[Op.substring]: keywords
				}
			},
				{
					description: {
					[Op.substring]: keywords
				}
			}
			]				
			},
			include : ["images"]
		})
		    .then(products => {
				return res.render("results",{
					products,
					keywords,
					toThousand
			})
		})
		
			.catch(error => console.log(error)) 
		
	},
	login: (req,res) => {
		return res.render("login")
	}

};

module.exports = controller;
