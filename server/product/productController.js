const Products = require('./productModel')
//Filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }
    filtering() {
        const queryObj = {...this.queryString} //this.queryString = req.query
        console.log(this.query);
        console.log(this.queryString )
        console.log( queryObj ) //before delete 'page'
        const excludeFields = ['page', 'sort','limit']
        excludeFields.forEach(el => delete(queryObj[el]))
        console.log(queryObj) //after delete 'page'
        let queryStr = JSON.stringify(queryObj)
        //gte = greater then or equal// lte: nho hon hoac bang
        queryStr = queryStr.replace(/\b(regex)\b/g,macth =>'$'+macth)
        this.query.find(JSON.parse(queryStr))
        //console.log(JSON.parse(queryStr))
        return this;
       
    }
    sorting() {
        if(this.queryString.sort){
            const sortby = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortby) //sort trong mongo
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
}

const productController = {
    
    getProducts: async(req, res) => {
       

        try {
           
            const features = new APIfeatures(Products.find(),req.query);
            const filter = features.filtering().sorting();
            const products = await filter.query
            //const products = await Products.find({title:{'$regex':'acer'}})
        
            res.json({
                status: 'success',
                result: products.length,
                products: products,
                
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