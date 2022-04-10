const CategoryPro = require('./categoryProductModel')
const Products = require('../product/productModel');
const categoryProductController = {
    getCategories: async(req, res) =>{
       try {
            const categoriesProd = await CategoryPro.find()
            res.json(categoriesProd)
       } catch (error) {
           return res.status(500).json({msg: error.message})
       }
    },
    createCategory: async(req, res)=>{
        try {
            
            //only admin can create, delete and update cate(role ==1)
            const {name} = req.body;
            const category = await CategoryPro.findOne({name})
            if(category) return res.status(400).json({msg: "Danh mục đã tồn tại!!"})
            const newCategory = new CategoryPro({name})
            await newCategory.save()
            res.json('Created Category')
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteCategory: async(req ,res)=>{
        try {
            const cate = await CategoryPro.findById(req.params.id);
            const products = await Products.findOne({category:req.params.id})
            if(products) return res.json({
               msg:"Vui lòng xoá những sản phẩm có danh mục "+cate.name+" trước!!"
            })
            await CategoryPro.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateCategory: async(req ,res)=>{
        try {
            const {name} = req.body;
            await CategoryPro.findOneAndUpdate({_id: req.params.id},{name})
            res.json("updated")

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
}

module.exports = categoryProductController