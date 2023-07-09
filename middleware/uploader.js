const multer = require('multer')
const path = require('path')


/**
 * file.filename: The value of 'name' attribute from 'input' HTML element
 */
// Set Storage Engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'public', 'uploads'),
    filename: (req, file, cb) => {
        cb(
            null, // Error Message
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            // file.fieldname + '-' + new Date() + path.extname(file.originalname)
        )
    }
})


// Init Uploader
const uploader = multer({ 
    storage,
    limits: { 
        // fileSize: 10 // bytes
    },
    fileFilter: (req, file, cb) => {
        // console.log(file.mimetype)
        const mimetype = file.mimetype
        // Allowed Mime Types
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'application/pdf'
        ]
        // Check Mime Type
        const allowed = allowedTypes.includes(mimetype)
        // console.log(allowed)
        if (!allowed) {
            cb('Please select allowed image file.')
        } else {
            cb(null, true)
        }
    }
}).single('myImage')


// Export Function Module
module.exports = (req, res, next) => {
    // res.status(200).send('Test')
    uploader(req, res, (err) => {
        if (err) {
            res.render('index', { msg: err.message || err })
        } else {
            // console.log(req.file)
            if (!req.file) {
                res.render('index', { msg: 'Please select a file to submit.' })
            } else {
                // res.render('index', { msg: 'The file has been submitted.' })
                next()
            }
        }
    })
}

