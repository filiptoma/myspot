const router = require('express').Router()
const Spot = require('../../models/Spot')
const User = require('../../models/User')
const Core = require('../../models/Core')
const ObjectId = require('mongodb').ObjectId
const VerifyAccess = require('../../services/VerifyAccess')

router.post('/new', VerifyAccess, async (req, res) => {
    if (req.body.name === '') {
        return res.status(400).json({ errorMsg: 'You forgot the name!' })
    }
    function slugify(string) {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
        return string.toString().toLowerCase().replace(p, c => b.charAt(a.indexOf(c)))
    }
    const newSpot = new Spot({
        name: req.body.name,
        queryName: slugify(req.body.name)
    })
    try {
        const savedSpot = await newSpot.save()
        res.status(200).json({ spotId: savedSpot._id })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/featured', async (req, res) => {
    try {
        const spots = await Spot.find()
        var pictures = new Array()
        for (var i = 0; i < spots.length; i++) {
            if (spots[i].picture) {
                pictures.push(Buffer.from(spots[i].picture).toString('base64'))
            } else {
                pictures.push('')
            }
        }
        res.status(200).json({ spots: spots, pictures: pictures })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/profile', async (req, res) => {
    try {
        const spot = await Spot.findOne(
            { _id: new ObjectId(req.query.spotId) }
        )
        if (spot.picture) {
            const picture = Buffer.from(spot.picture).toString('base64')
            res.status(200).json({ spot: spot, picture: picture })
        } else {
            res.status(200).json({ spot: spot })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/edit', VerifyAccess, async (req, res) => {
    if (req.body.name) {
        function slugify(string) {
            const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
            const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
            const p = new RegExp(a.split('').join('|'), 'g')
            return string.toString().toLowerCase().replace(p, c => b.charAt(a.indexOf(c)))
        }
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {name: req.body.name, queryName: slugify(req.body.name)} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.address) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {address: req.body.address} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.categories) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {categories: req.body.categories} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.tags) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {tags: req.body.tags} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.rating) {
        const ratingData = await Spot.findOne({ _id: new ObjectId(req.body.spotId) })
        const sum = ratingData.rating.sum + req.body.rating
        const count = ratingData.rating.count + 1
        const rawAvg = sum/count
        const avg = Math.round(rawAvg * 10) / 10
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                [
                    { $set: {rating: {sum: sum}} },
                    { $set: {rating: {count: count}} },
                    { $set: {rating: {avg: avg}} }
                ]
            )
            await User.updateOne(
                { username: req.body.user.username },
                { $push: {rated: req.body.spotId} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.firstComment) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $push: {
                    comments: {
                        text: req.body.firstComment,
                        date: new Date(Date.now()),
                        author: req.body.user.username,
                        likes: 0,
                        _id: new ObjectId()
                    }
                }}
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.picture) {
        const picture = req.body.picture
        if (picture.split(',')[1]) {
            const pictureBuffer = Buffer.from(picture.split(',')[1], 'base64')
            try {
                await Spot.updateOne(
                    { _id: new ObjectId(req.body.spotId) },
                    { $set: {picture: pictureBuffer} }
                )
                res.status(200).end()
            } catch (error) {
                res.status(400).send(error)
            }
        } else {
            const pictureBuffer = Buffer.from(picture, 'base64')
            try {
                await Spot.updateOne(
                    { _id: new ObjectId(req.body.spotId) },
                    { $set: {picture: pictureBuffer} }
                )
                res.status(200).end()
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

    if (req.body.openingHrs) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {openingHrs: req.body.openingHrs} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.about) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {about: req.body.about} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.phone) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {phone: req.body.phone} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.web) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {web: req.body.web} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.email) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {email: req.body.email} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.instagram) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {instagram: req.body.instagram} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.facebook) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {facebook: req.body.facebook} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }
    res.status(200).end()
})

module.exports = router