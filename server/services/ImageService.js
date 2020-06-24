const router = require('express').Router()
const multer = require('multer')
const mkdirp = require('mkdirp')

const multerStorage = multer.diskStorage({
    destination: (req, image, cb) => {
        const dir = `data/images/spots/${req.body.spot}`
        mkdirp(dir, error => cb(error, dir))
    },
    filename: (req, image, cb) => {
        const ext = image.mimetype.split('/')[1]
        cb(null, `spot-${req.body.spot.toLowerCase()}-${Date.now()}.${ext}`)
    }
})
const upload = multer({
    storage: multerStorage,
})

router.post('/', upload.single('image'), (req, res) => {
    res.status(200).json({ image: req.image })
})

module.exports = router