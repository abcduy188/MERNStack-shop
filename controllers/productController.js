const Products = require('../models/productModel')
const Images = require('../models/imagesModel')
//Filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }
    filtering() {
        const queryObj = {...this.queryString} //this.queryString = req.query
        console.log(queryObj) //before delete 'page'
        const excludeFields = ['page', 'sort','limit']
        excludeFields.forEach(el => delete(queryObj[el]))
        console.log("query",queryObj) //after delete 'page'
        let queryStr = JSON.stringify(queryObj)
        
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,macth =>'$'+macth)
        //gte = greater then or equal// lte: nho hon hoac bang
        console.log({queryObj,queryStr})
        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting() {
        if(this.queryString.sort){
            const sortby = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortby)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page *1||1
        const limit = this.queryString.limit * 1|| 3
        const skip = (page -1) *limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productController = {
    
    getProducts: async(req, res) => {
       

        try {
           //list product by category
           
            // const products = await Products.find({_id:'6210af7f2de4f32d546dd837'});



            // find all product
            const features = new APIfeatures(Products.find(),req.query).filtering().sorting()
            const products = await features.query

              
          
        
            res.json({
                status: 'success',
                result: products.lenght,
                products: products
                
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }

    },
    createProduct: async(req, res) => {
        try {
            const { product_id, title, price, description, content, images, category, cpu,vga,ram,weight } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })
            const product = await Products.findOne({ product_id })
            if (product)
                return res.status(400).json({ msg: "This product already exist" })
            const newProduct = new Products({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category,
                cpu,
                vga,
                ram,
                weight

            })
            await newProduct.save()
            res.json({ msg: newProduct._id });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateProduct: async(req, res) => {
        try {
            const { product_id, title, price, description, content, images, category, cpu,vga,ram,weight } = req.body;
            if (!images) await Products.findByIdAndUpdate({ _id: req.params.id }, { cpu,vga,ram,weight })
            else await Products.findByIdAndUpdate({ _id: req.params.id }, { title: title.toLowerCase(), price, description, content, images, category, cpu,vga,ram,weight })
            res.json({ msg: "update success" });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteProduct: async(req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "deleteproduct success" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    listImages: async(req, res) =>{
        try {
            const images = await Images.find({product_id : req.params.id});
            res.json({
                status: 'success',
                result: images.lenght,
                images: images
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}
module.exports = productController