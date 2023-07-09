const express = require('express')
const ejs = require('ejs')
const path = require('path')
const multer = require('multer')
const uploader = require('./middleware/uploader')


// Init App
const app = express()

// Setup EJS
app.set('view engine', 'ejs')

// Use Public Folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    // res.status(200).send('Hello')
    res.render('index')
})

/**
 * file.filename: The value of 'name' attribute from 'input' HTML element
 */
// // Set Storage Engine
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '..', 'public', 'uploads'),
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// // Init Uploader
// const uploader = multer({ storage }).single('myImage')
// // Upload Handler
// app.post('/upload', (req, res) => {
//     // res.status(200).send('Test')
//     uploader(req, res, (err) => {
//         if (err) {
//             res.render('index', { msg: err })
//         } else {
//             // console.log(req.file)
//             const file = req.file
//             if (!file) {
//                 res.render('index', { msg: 'Please select a file to submit.' })
//             } else {
//                 res.render('index', { msg: 'The file has been submitted.' })
//             }
//         }
//     })
// })

app.post('/upload', uploader, (req, res) => {
    // console.log(req.file.filename)
    if (!req.file.filename) {
        res.render('index', { 
            msg: 'The file has NOT been submitted. Please try again.',
        })
    } else {
        if (req.file.mimetype.startsWith('image/')) {
            res.render('index', { 
                msg: 'Image has been submitted.',
                file: `/uploads/${req.file.filename}`
            })
        } else { 
            res.render('index', { 
                msg: 'File has been submitted.',
                file: `/uploads/${req.file.filename}`
            })
        }
    }

})

const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`);
})