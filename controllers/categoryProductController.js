const CategoryPro = require('../models/categoryProductModel')
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
            if(category) return res.status(400).json({msg: "this category already exist"})
            const newCategory = new CategoryPro({name})
            await newCategory.save()
            res.json('Created Category')
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteCategory: async(req ,res)=>{
        // try {
        //     const isdelete = true;
        //     await CategoryPro.findOneAndUpdate({_id: req.params.id},{isdelete})
        //     res.json("updated")

        // } catch (error) {
        //     return res.status(500).json({msg: error.message})
        // }
        try {
            await CategoryPro.findByIdAndDelete(req.params.id)
            res.json("updated")

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