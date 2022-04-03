const cloudinary = require('cloudinary')
const fs = require('fs')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadController ={
    upload: (req,res)=>{
        try {
            if (!req.files || Object.keys(req.files).length == 0)
                return res.status(400).json({ msg: "No file was upload" })
            const file = req.files.file;
            if (file.size > 1024 * 1024 * 5) //1024*1024*3 = 3mb
            {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "size to large" })
            }
    
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "File Format is incorrect." })
            }
    
    
            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async(err, result) => {
                if (err) throw err;
                //after upload witll have file tmp -> delete them
                removeTmp(file.tempFilePath)
                res.json({ public_id: result.public_id, url: result.secure_url })   
            })
    
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    destroy: (req, res)=>{
        try {
            const { public_id } = req.body;
            if (!public_id) return res.status(400).json({ msg:"no image selected" })
            cloudinary.v2.uploader.destroy(public_id, async(err,result)=>{
                if(err) throw err;
                res.json({msg:"deleted image"})
            })
    
        } catch (error) {
    
            res.status(500).json({ msg: error.message })
        }
    }

}
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;

    })
}
module.exports = uploadController