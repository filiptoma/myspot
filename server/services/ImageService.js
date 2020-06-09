const router = require('express').Router()
const multer = require('multer')
const mkdirp = require('mkdirp')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `data/images/users/${req.body.username}`
        mkdirp(dir, error => cb(error, dir))
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `user-${req.body.username.toLowerCase()}-${Date.now()}.${ext}`)
    }
})
const upload = multer({
    storage: multerStorage,
})

router.post('/', upload.single('file'), (req, res) => {
    res.json({ file: req.file })
})

module.exports = router