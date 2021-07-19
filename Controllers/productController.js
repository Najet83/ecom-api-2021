const fs = require('fs')
const path = require('path')
const express = require("express")
const multer = require("multer")

const Product = require("./../models/product")
const Category = require("./../models/category")
const { isAdmin } = require("./../middlewares/auth")

const app = express()


// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //prend l'extension du fichier file et le compare avec l'expression régulière et retourne true or false
    // Check mime
    const mimetype = filetypes.test(file.mimetype); //prend mimetype du fichier file et le compare avec l'expression régulière et retourne true or false

    if (mimetype && extname) {
        return cb(null, true); //cb est une call back function qui prends 2 parametres erreur,boolean
    } else {
        cb('Error: Images Only!',false);
    }
}

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public',
    
    filename: function (req, file, cb) {
        let name = req.body.name.replace(' ', '').toLowerCase();
        cb(null, name + '-' + Date.now() + path.extname(file.originalname)); // fonction qui permet de modifier le nom du fichier
    }
});


// Init Upload
const upload = multer({//créer un objet de la classe multer qui a les attributs suivants
    storage: storage, // stocker le fichier
    limits: { fileSize: 1000000 }, // pour controler  file size du fichier, il ne peut pas passer les limites
    fileFilter: function (req, file, cb) {  // pour controler  file type avec appel de la fonction checkFileType définit en haut
        checkFileType(file, cb);
    }
});

app.get("/one/:id", async (req, res) => {

    try {
        let productId = req.params.id

        let product = await Product.findOne({ _id: productId })

        let category = await Category.findOne({ _id: product.categoryID })

        res.status(200).send({
            ...product._doc,
            categoryName: category.name
        })
    }
    catch (e) {
        res.status(400).send({ error: e })
    }
})

app.get("/all", async (req, res) => {
    try {
        let products = await Product.find()

        for (let i = 0; i < products.length; i++) {

            let category = await Category.findOne({ _id: products[i].categoryID })
            products[i] = { ...products[i]._doc, categoryName: category.name }
        }
        res.status(200).send(products)
    }
    catch (e) {
        res.status(400).send({ error: e })
    }
})

app.get("/stat",isAdmin, (req, res) => {

    res.send("get all statistique products")
})

app.post("/add",[isAdmin,upload.single('img')], (req, res) => { // upload.single est un middlware pour récupérer le fichier img , on peut faire upload.multiple (...) si on a passé plusieurs images/fichiers

    let data = req.body
    let file = req.file // pour récupérer les caractéristiques du fichier image envoyé du front end
    let product = new Product({
        name: data.name,
        price: data.price,
        description: data.description,
        image: file.filename,  // on stocke dans la BD le nom du fichier image
        categoryID: data.categoryID

    })

    product.save()
        .then((savedProduct) => {
            res.status(201).send({ message: "product added" })

        })

        .catch((e) => {
            res.status(400).send({
                message: "product not added",
                error: e
            })
        })

})

app.put("/update-info/:id",[isAdmin,upload.single('img')], async(req, res) => {
    let data = req.body
    let file = req.file
    let productId = req.params.id

    let prod = await Product.findOne({ _id: productId })
    fs.unlinkSync("./public/" + prod.image)

    let product = new Product({
        _id:productId,
        name: data.name,
        price: data.price,
        description: data.description,
        image: file.filename,  // on stocke dans la BD le nom du fichier image
        categoryID: data.categoryID
    })

    
    Product.findOneAndUpdate({ _id: productId }, product)
        .then((product_res) => {
            if (!product_res) {
                res.status(404).send({ message: "product not found" })
            }
            else {
                res.status(200).send({ "message": "product is updated " })
            }
        })
        .catch((e) => {
            res.status(400).send({ error: e })
        })
})

app.delete("/remove/:id",isAdmin, (req, res) => {
    let productId = req.params.id

    Product.findOneAndDelete({ _id: productId })
        .then((product) => {
            if (!product) {
                res.status(404).send({ message: "product not found" })
            }
            else {
                fs.unlinkSync("./public/" + product.image)
                res.status(200).send({ "message": "product is deleted " })
            }
        })
        .catch((e) => {
            res.status(400).send({ error: e })
        })

})


module.exports = app