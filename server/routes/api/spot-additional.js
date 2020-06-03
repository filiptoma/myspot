const router = require('express').Router()
const Spot = require('../../models/Spot')
const ObjectId = require('mongodb').ObjectId

router.get('/opening-hrs', async (req, res) => {
    try {
        const spot = await Spot.findOne(
            { _id: new ObjectId(req.query.spotId) }
        )
        res.status(200).json({ openingHrs: spot.openingHrs })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/gmap', async (req, res) => {
    try {
        const spot = await Spot.findOne(
            { _id: new ObjectId(req.query.spotId) }
        )
        res.status(200).json({ address: spot.address })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/about', async (req, res) => {
    try {
        const spot = await Spot.findOne(
            { _id: new ObjectId(req.query.spotId) }
        )
        res.status(200).json({
            about: spot.about,
            tags: spot.tags
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router