const cloudinary = require("cloudinary")
const fs = require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadCtrl = {
    uploadAvatar: (req, res) => {
        try {
            const file = req.files.file
            // return console.log(file)
            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'E-commerce', width: 150, height: 150, crop: "fill"
            }, async (err, result) => {
                // console.log('file works')
                if (err){
                    removeTmp(file.tempFilePath)
                    throw err
                }
                
                removeTmp(file.tempFilePath)
                // console.log(result)
                return res.status(200).json(result)
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteAvatar: (req, res) => {
        try {
            //the zombie should be the image public ID
            if(!req.body.publicId) return res.status(400).json('No image to be deleted')
            cloudinary.v2.uploader.destroy(req.body.publicId, function (result) {
                //  console.log(result)
                 res.status(200).json('Image deleted')
            });
        } catch (error) {
            return res.status(500).json(error)
        }

    }
}


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
        // console.log(path + ' has been deleted.')
    })
}
module.exports = uploadCtrl