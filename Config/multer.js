const multer = require("multer")
const path = require('path')
const storage = multer.diskStorage({
    destination: 'image',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
        const fileParse = path.parse(file.originalname)
        cb(null, fileParse.name + '-' + uniqueSuffix + fileParse.ext)
    },
})
function fileFilter(req, file, cb) {
    const filter = /pdf/
    const ext = path.extname(file.originalname)
    if (filter.test(ext)) {
        cb(null, true)
    } else {
        cb(new Error('required png and jpg format '), false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })
module.exports = upload